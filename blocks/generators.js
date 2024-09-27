Blockly.Python['setUp'] = function(block) {
  Blockly.Python.definitions_['import ncheap'] = 'from ncheap import NCheap,Motor,Oled,Mpu6050';
  var code = `\nbot = NCheap()\nm =Motor()\no=Oled()\nmpu = Mpu6050()\n`;
  return code;
};


/*-------------------------------------Motor-------------------------------------------------------*/
Blockly.Python['motor_forward'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'from motor import Motor';
  var speed = Blockly.Python.valueToCode(block, 'fd_speed', Blockly.Python.ORDER_ATOMIC);
  var code = `m.fd(${speed})\n`;
  return code;
};
Blockly.Python['motor_backward'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'from motor import Motor';
  var speed = Blockly.Python.valueToCode(block, 'bk_speed', Blockly.Python.ORDER_ATOMIC);
  var code = `m.fd(${-speed})\n`;
  return code;
};
Blockly.Python['motor_spinLeft'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'from motor import Motor';
  var speed = Blockly.Python.valueToCode(block, 'sl_speed', Blockly.Python.ORDER_ATOMIC);
  var code = `m.sl(${speed})\n`;
  return code;
};
Blockly.Python['motor_spinRight'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'from motor import Motor';
  var speed = Blockly.Python.valueToCode(block, 'sr_speed', Blockly.Python.ORDER_ATOMIC);
  var code = `m.sr(${speed})\n`;
  return code;
};
Blockly.Python['motor_stop'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'from motor import Motor';
  var code = `m.stop()\n`;
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
  var code = `bot.beep(${time_})`;
  return code;
};
Blockly.Python['servo'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var pin_value = Blockly.Python.valueToCode(block, 'degree', Blockly.Python.ORDER_ATOMIC);
  var code = `\nbot.servo(${dropdown_pin},${pin_value})\n`;
  return code;
};
Blockly.Python['waitsw1'] = function(block) {
  var code = `\nbot.wait_sw1()\n`;
  return code;
};