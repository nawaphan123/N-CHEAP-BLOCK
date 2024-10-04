Blockly.Python['setUp'] = function(block) {
  Blockly.Python.definitions_['import ncheap'] = 'from ncheap import NCheap,Motor,Oled,Mpu6050';
  var code = `\nbot = NCheap()\nm =Motor()\no=Oled()\nmpu = Mpu6050()\nbot.beep(0.2)\n`;
  return code;
};


/*-------------------------------------Motor-------------------------------------------------------*/
Blockly.Python['motor_move'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = '';
  var Lspeed = Blockly.Python.valueToCode(block, 'L_speed', Blockly.Python.ORDER_ATOMIC);
  var Rspeed = Blockly.Python.valueToCode(block, 'L_speed', Blockly.Python.ORDER_ATOMIC);
  var code = `\nm.motor(1,${Lspeed})\nm.motor(2,${Rspeed}\n`;
  return code;
};
Blockly.Python['motor_forward'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = '';
  var speed = Blockly.Python.valueToCode(block, 'fd_speed', Blockly.Python.ORDER_ATOMIC);
  var code = `\nm.fd(${speed})\n`;
  return code;
};
Blockly.Python['motor_backward'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = '';
  var speed = Blockly.Python.valueToCode(block, 'bk_speed', Blockly.Python.ORDER_ATOMIC);
  var code = `\nm.fd(${-speed})\n`;
  return code;
};
Blockly.Python['motor_spinLeft'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = '';
  var speed = Blockly.Python.valueToCode(block, 'sl_speed', Blockly.Python.ORDER_ATOMIC);
  var code = `\nm.sl(${speed})\n`;
  return code;
};
Blockly.Python['motor_spinRight'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = '';
  var speed = Blockly.Python.valueToCode(block, 'sr_speed', Blockly.Python.ORDER_ATOMIC);
  var code = `\nm.sr(${speed})\n`;
  return code;
};

Blockly.Python['motor_turnLeft'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = '';
  var speed = Blockly.Python.valueToCode(block, 'tl_speed', Blockly.Python.ORDER_ATOMIC);
  var code = `\nm.tl(${speed})\n`;
  return code;
};
Blockly.Python['motor_turnRight'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = '';
  var speed = Blockly.Python.valueToCode(block, 'tr_speed', Blockly.Python.ORDER_ATOMIC);
  var code = `\nm.tr(${speed})\n`;
  return code;
};

Blockly.Python['motor_stop'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = '';
  var code = `\nm.stop()\n`;
  return code;
};
/*-------------------------------------Oled 0.96-------------------------------------------------------*/
Blockly.Python['oled_print'] = function(block) {
  Blockly.Python.definitions_[''] = '';
  
  var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
  var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);

  var code = `o.text(${value_text}, ${value_x}, ${value_y})\no.show()\n`;
  return code;
};

Blockly.Python['oled_clearData'] = function(block) {
  var code = 'o.fill(0)\no.show()\n';
  return code;
};
/*------------------------------------mpu6050------------------------------------- */
Blockly.Python['mpu6050_get_Angle'] = function(block) {
  var dropdown_axis = block.getFieldValue('angle');
  var code = `mpu.${dropdown_axis}()`;
  return [code, Blockly.Python.ORDER_NONE];
};
/*------------------------------------NCheap------------------------------- */
Blockly.Python['getSw1'] = function(block) {
  var code = `bot.sw1()`;
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['knob'] = function(block) {
  var code = `\nbot.knob()\n`;
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['sensor'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var code = `\nbot.analog_read(${dropdown_pin})\n`;
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['output'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var pin_value = Blockly.Python.valueToCode(block, 'pin_value', Blockly.Python.ORDER_ATOMIC);
  var code = `\nbot.output(${dropdown_pin},${pin_value})\n`;
  return code;
};
Blockly.Python['input'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var code = `\nbot.input(${dropdown_pin})\n`;
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['Beep'] = function(block) {
  var time_ = Blockly.Python.valueToCode(block, 'time_', Blockly.Python.ORDER_ATOMIC);
  var code = `\nbot.beep(${time_})\n`;
  return code;
};
Blockly.Python['servo'] = function(block) {
  Blockly.Python.definitions_['import PWM'] = 'from machine import PWM,Pin';
  var dropdown_pin = block.getFieldValue('pin');
  var pin_value = Blockly.Python.valueToCode(block, 'degree', Blockly.Python.ORDER_ATOMIC);
  var code = `\nPWM(Pin(${dropdown_pin}), freq=50).duty(int(25.57 + (((${pin_value}) / 180.0) * 102.3)))\n`;
  return code;
};
Blockly.Python['waitsw1'] = function(block) {
  var code = `\nbot.wait_sw1()\n`;
  return code;
};
