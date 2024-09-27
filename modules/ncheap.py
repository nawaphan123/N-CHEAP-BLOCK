from machine import Pin, ADC, PWM  # Import classes for working with pins, ADC, and PWM
from time import sleep  # Import sleep function for delays
# Import additional necessary modules
from utime import sleep_ms  # Import sleep function from utime for millisecond delays
from machine import I2C, Pin  # Import I2C and Pin for communication with MPU6050
import time  # Import time functions
from math import sqrt, degrees, acos, atan2  # Import math functions for angle calculations

#####
import time
import framebuf
from machine import Pin, SoftI2C
from time import sleep



# Register definitions
SET_CONTRAST        = const(0x81)
SET_ENTIRE_ON       = const(0xa4)
SET_NORM_INV        = const(0xa6)
SET_DISP            = const(0xae)
SET_MEM_ADDR        = const(0x20)
SET_COL_ADDR        = const(0x21)
SET_PAGE_ADDR       = const(0x22)
SET_DISP_START_LINE = const(0x40)
SET_SEG_REMAP       = const(0xa0)
SET_MUX_RATIO       = const(0xa8)
SET_COM_OUT_DIR     = const(0xc0)
SET_DISP_OFFSET     = const(0xd3)
SET_COM_PIN_CFG     = const(0xda)
SET_DISP_CLK_DIV    = const(0xd5)
SET_PRECHARGE       = const(0xd9)
SET_VCOM_DESEL      = const(0xdb)
SET_CHARGE_PUMP     = const(0x8d)

class Oled:
    def __init__(self, width=128, height=64, addr=0x3c, external_vcc=False):
        self.width = width
        self.height = height
        self.external_vcc = external_vcc
        self.pages = self.height // 8
        self.addr = addr
        
        # Set up I2C communication
        self.i2c = SoftI2C(scl=Pin(22), sda=Pin(21))
        self.temp = bytearray(2)
        # Add an extra byte to the data buffer to hold an I2C data/command byte
        self.buffer = bytearray(((height // 8) * width) + 1)
        self.buffer[0] = 0x40  # Set first byte of data buffer to Co=0, D/C=1
        self.framebuf = framebuf.FrameBuffer1(memoryview(self.buffer)[1:], width, height)

        # Initialize display
        self.poweron()
        self.init_display()

    def init_display(self):
        for cmd in (
            SET_DISP | 0x00, # display off
            SET_MEM_ADDR, 0x00, # horizontal addressing mode
            SET_DISP_START_LINE | 0x00,
            SET_SEG_REMAP | 0x01, # column addr 127 mapped to SEG0
            SET_MUX_RATIO, self.height - 1,
            SET_COM_OUT_DIR | 0x08, # scan from COM[N] to COM0
            SET_DISP_OFFSET, 0x00,
            SET_COM_PIN_CFG, 0x02 if self.height == 32 else 0x12,
            SET_DISP_CLK_DIV, 0x80,
            SET_PRECHARGE, 0x22 if self.external_vcc else 0xf1,
            SET_VCOM_DESEL, 0x30, # 0.83*Vcc
            SET_CONTRAST, 0xff, # maximum contrast
            SET_ENTIRE_ON, # output follows RAM contents
            SET_NORM_INV, # not inverted
            SET_CHARGE_PUMP, 0x10 if self.external_vcc else 0x14,
            SET_DISP | 0x01): # display on
            self.write_cmd(cmd)
        self.write_cmd(SET_COM_OUT_DIR)             # mirror vertically
        self.write_cmd(SET_SEG_REMAP)               # mirror horizontally (64 rows)
        self.fill(0)
        self.show()

    def poweroff(self):
        self.write_cmd(SET_DISP | 0x00)

    def contrast(self, contrast):
        self.write_cmd(SET_CONTRAST)
        self.write_cmd(contrast)

    def invert(self, invert):
        self.write_cmd(SET_NORM_INV | (invert & 1))

    def show(self):
        x0 = 0
        x1 = self.width - 1
        if self.width == 64:
            # displays with width of 64 pixels are shifted by 32
            x0 += 32
            x1 += 32
        self.write_cmd(SET_COL_ADDR)
        self.write_cmd(x0)
        self.write_cmd(x1)
        self.write_cmd(SET_PAGE_ADDR)
        self.write_cmd(0)
        self.write_cmd(self.pages - 1)
        self.write_framebuf()

    def fill(self, col):
        self.framebuf.fill(col)

    def pixel(self, x, y, col):
        self.framebuf.pixel(x, y, col)

    def scroll(self, dx, dy):
        self.framebuf.scroll(dx, dy)

    def text(self, string, x, y, col=1):
        self.framebuf.text(str(string), x, y, col)
    def clear(self):
        self.framebuf.fill(0)
    def write_cmd(self, cmd):
        self.temp[0] = 0x80  # Co=1, D/C#=0
        self.temp[1] = cmd
        self.i2c.writeto(self.addr, self.temp)

    def write_framebuf(self):
        # Send the frame buffer in one I2C transaction
        self.i2c.writeto(self.addr, self.buffer)

    def poweron(self):
        pass  # No explicit poweron functionality for I2C, handled by init_display
#####
# Helper function to convert two bytes (MSB and LSB) into a signed integer
def bytes_toint(msb, lsb):
    return msb << 8 | lsb if msb & 0x80 == 0 else -(((msb ^ 255) << 8) | (lsb ^ 255) + 1)

# MPU6050 Class to interface with the accelerometer and gyroscope sensor
class Mpu6050:
    def __init__(self,addr=0x68):
        # Initialize I2C communication with the sensor
        self.i2c = SoftI2C(scl=Pin(22), sda=Pin(21))  # Set SCL and SDA pins
        self.addr = addr  # Sensor I2C address
        self.buf = bytearray(6)  # Buffer to store sensor data

        # Initialize variables for gyro offsets and angles
        self.gyro_offset = [0, 0, 0]  # Offset for X, Y, Z axes of the gyro
        self.angle = [0, 0, 0]  # Angles for X (roll), Y (pitch), Z (yaw)
        self.gyro_angle = [0, 0, 0]  # Gyroscope-based angles for X, Y, Z

        self.prev_time = time.ticks_ms()  # Store the current time for interval calculations
        
        self.wake()  # Wake the MPU6050 from sleep mode
        self.calibrate_gyro()  # Calibrate the gyroscope
        print("i'm inn")

    def wake(self):
        # Send command to wake up MPU6050 by writing to power management register
        self.i2c.writeto_mem(self.addr, 0x6B, b'\x00')

    def calibrate_gyro(self):
        # Calibrate the gyroscope by taking 1000 readings and averaging them
        gyro_offset_sum = [0, 0, 0]
        for _ in range(1000):
            self.read_gyro()
            gyro_offset_sum[0] += self.gyro[0]
            gyro_offset_sum[1] += self.gyro[1]
            gyro_offset_sum[2] += self.gyro[2]
            time.sleep(0.001)  # Small delay between readings

        self.gyro_offset = [x / 1000 for x in gyro_offset_sum]  # Calculate average offsets

    def read_accel(self):
        # Read accelerometer values and convert them to readable format (g-force)
        self.i2c.readfrom_mem_into(self.addr, 0x3B, self.buf)
        ax = bytes_toint(self.buf[0], self.buf[1]) / 16384.0
        ay = bytes_toint(self.buf[2], self.buf[3]) / 16384.0
        az = bytes_toint(self.buf[4], self.buf[5]) / 16384.0
        return ax, ay, az

    def read_gyro(self):
        # Read gyroscope values and apply offset corrections
        self.i2c.readfrom_mem_into(self.addr, 0x43, self.buf)
        gx = bytes_toint(self.buf[0], self.buf[1]) / 131.0 - self.gyro_offset[0]
        gy = bytes_toint(self.buf[2], self.buf[3]) / 131.0 - self.gyro_offset[1]
        gz = bytes_toint(self.buf[4], self.buf[5]) / 131.0 - self.gyro_offset[2]
        self.gyro = [gx, gy, gz]

    def update(self):
        # Read accelerometer and gyroscope data to calculate angles
        ax, ay, az = self.read_accel()
        self.read_gyro()

        # Calculate accelerometer angles for X and Y axes (roll and pitch)
        angle_acc_x = atan2(ay, az) * 180 / 3.141592
        angle_acc_y = atan2(ax, az) * -180 / 3.141592

        # Calculate time interval in seconds
        now = time.ticks_ms()
        interval = (now - self.prev_time) / 1000.0
        self.prev_time = now

        # Update the gyro angle based on gyroscope readings
        self.gyro_angle[0] += self.gyro[0] * interval
        self.gyro_angle[1] += self.gyro[1] * interval
        self.gyro_angle[2] += self.gyro[2] * interval

        # Use complementary filter to combine accelerometer and gyro data for X, Y angles
        self.angle[0] = 0.98 * (self.angle[0] + self.gyro[0] * interval) + 0.02 * angle_acc_x
        self.angle[1] = 0.98 * (self.angle[1] + self.gyro[1] * interval) + 0.02 * angle_acc_y
        self.angle[2] = self.gyro_angle[2]  # Only use gyro for Z angle (yaw)

    # Return the roll angle (X-axis)
    def roll(self):
        self.update()
        return int(self.angle[0]+180)

    # Return the pitch angle (Y-axis)
    def pictch(self):
        self.update()
        return int(self.angle[1]+180)

    # Return the yaw angle (Z-axis)
    def yaw(self):
        self.update()
        return int(self.angle[2]+180)

# Motor control class
class Motor:
    def __init__(self, m1a=2, m1b=4, m2a=16, m2b=17):
        # Initialize PWM for motor control pins
        self.m1a = PWM(Pin(m1a), 5000)
        self.m1b = PWM(Pin(m1b), 5000)
        self.m2a = PWM(Pin(m2a), 5000)
        self.m2b = PWM(Pin(m2b), 5000)
        print("i'm in motor")

    def motor(self, pin, _speed):
        # Convert speed to a PWM duty cycle (range 0-1023)
        _speed = int(_speed * 10.23)
        if pin == 1:
            if _speed > 0:
                self.m1a.duty(abs(1023 - _speed))
                self.m1b.duty(1023)
            elif _speed <= 0:
                self.m1a.duty(1023)
                self.m1b.duty(abs(1023 + _speed))
        elif pin == 2:
            if _speed > 0:
                self.m2a.duty(abs(1023 - _speed))
                self.m2b.duty(1023)
            elif _speed <= 0:
                self.m2a.duty(1023)
                self.m2b.duty(abs(1023 + _speed))

    def stop(self):
        # Stop both motors
        self.motor(1, 0)
        self.motor(2, 0)

    def fd(self, _speed):
        # Move forward with given speed
        self.motor(1, _speed)
        self.motor(2, _speed)

    def sl(self, _speed):
        # Spin left by reversing one motor
        self.motor(1, -_speed)
        self.motor(2, _speed)

    def sr(self, _speed):
        # Spin right by reversing the other motor
        self.motor(1, _speed)
        self.motor(2, -_speed)

# Combined class for motor control and MPU6050 usage
class NCheap():
    def beep(self, time_sec):
        # Control a buzzer connected to Pin 12
        buzzer = Pin(13, mode=Pin.OUT)
        buzzer.value(1)
        sleep(time_sec)
        buzzer.value(0)
        sleep(0.01)
    # Helper methods for handling inputs and outputs
    def sw1(self):
        # Read the state of switch connected to Pin 15
        sw1 = Pin(15, mode=Pin.IN, pull=Pin.PULL_UP)
        return sw1.value()

    def wait_sw1(self):
        # Wait until the switch is pressed
        while self.sw1() == 1:
            sleep(0.01)
        self.beep(0.1)
    def knob(self):
        # Read the value from a potentiometer (knob) on Pin 36
        knob = ADC(Pin(36))
        knob.atten(ADC.ATTN_11DB)  # Full range voltage 3.3V
        return knob.read()

    def analog_read(self, pin):
        # Read analog value from a specified pin
        adc = ADC(Pin(pin))
        adc.atten(ADC.ATTN_11DB)
        return adc.read()

    def output(self, pin, state):
        # Set a digital output on the specified pin
        o = Pin(pin, mode=Pin.OUT)
        o.value(state)

    def input(self, pin):
        # Read digital input from the specified pin
        i = Pin(pin, mode=Pin.IN)
        return i.value()

    def servo(self, pin, rad):
        # Control a servo on one of 4 specified pins
        ser_pin = [23, 19, 18, 5]
        ser = PWM(Pin(ser_pin[pin-1]))
        ser.freq(50)
        ser.duty(int(25.57 + ((rad / 180.0) * 102.3)))



