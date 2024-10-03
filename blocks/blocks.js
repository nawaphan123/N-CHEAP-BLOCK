Blockly.defineBlocksWithJsonArray([
  {
    "type": "setUp",
    "message0": "Setup N-CHEAP Bot",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#a200ff",
    "tooltip": "Setup N-CHEAP Bot",
    "helpUrl": ""
  },
  {
    "type": "Beep",
    "message0": "Beep For %1 sec",
    "args0": [
      {
        "type": "input_value",
        "name": "time_",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ff7c00",
    "tooltip": "beep beep",
    "helpUrl": ""
  },
  /*---------------------------------motor----------------------------------------------*/
  {
    "type": "motor_move",
    "message0": "Move ( Left Speed %1 %) ( Right Speed %2 %)",
    "args0": [
      {
        "type": "input_value",
        "name": "L_speed",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "R_speed",
        "check": "Number"
      },
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ff0000",
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "motor_forward",
    "message0": "Move Forward Speed %1 %",
    "args0": [
      {
        "type": "input_value",
        "name": "fd_speed",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ff0000",
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "motor_backward",
    "message0": "Move Backward Speed %1 %",
    "args0": [
      {
        "type": "input_value",
        "name": "bk_speed",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ff0000",
    "tooltip": "",
    "helpUrl": ""
  }
  ,{
    "type": "motor_spinLeft",
    "message0": "Spin Left ↺ Speed %1 %",
    "args0": [
      {
        "type": "input_value",
        "name": "sl_speed",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ff0000",
    "tooltip": "",
    "helpUrl": ""
  },{
    "type": "motor_spinRight",
    "message0": "Spin Right ↻ Speed %1 %",
    "args0": [
      {
        "type": "input_value",
        "name": "sr_speed",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ff0000",
    "tooltip": "",
    "helpUrl": ""
  }
  ,{
    "type": "motor_turnLeft",
    "message0": "Turn Left ↺ Speed %1 %",
    "args0": [
      {
        "type": "input_value",
        "name": "tl_speed",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ff0000",
    "tooltip": "",
    "helpUrl": ""
  }
  ,{
    "type": "motor_turnRight",
    "message0": "Turn Right ↻ Speed %1 %",
    "args0": [
      {
        "type": "input_value",
        "name": "tr_speed",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ff0000",
    "tooltip": "",
    "helpUrl": ""
  }
  ,{
    "type": "motor_stop",
    "message0": "Stop Moving",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ff0000",
    "tooltip": "",
    "helpUrl": ""
  },
  /*-------------------------------oled0.96------------------------------------------*/
  {
    "type": "oled_print",
    "message0": "OLED Print %1 At X: %2 | Y: %3 |",
    "args0": [
      {
        "type": "input_value",
        "name": "text"
      },
      {
        "type": "input_value",
        "name": "x",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "y",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4ca9e6",
    "tooltip": "Draw text on OLED",
    "helpUrl": ""
  },
  {
    "type": "oled_clearData",
    "message0": "OLED Clear",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4ca9e6",
    "tooltip": "clear screen",
    "helpUrl": ""
  },
  /*----------------------------mpu6050-----------------------------------------*/
  {
    "type": "mpu6050_get_Angle",
    "message0": "MPU6050 get Angle %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "angle",
        "options": [
          [
            "X",
            "roll"
          ],
          [
            "Y",
            "picth"
          ],
          [
            "Z",
            "yaw"
          ]
        ]
      }
    ],
    "output": null,
    "colour": "#00ad49",
    "tooltip": "",
    "helpUrl": ""
  },
  /*---------------------Ncheap----------------------*/
  {
    "type": "getSw1",
    "message0": "Sw1",
    "output": null,
    "colour": "#00ad49",
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "knob",
    "message0": "knob",
    "output": null,
    "colour": "#00ad49",
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sensor",
    "message0": "Sensor %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "pin",
        "options": [
          [
            "ADC0",
            "39"
          ],
          [
            "ADC1",
            "34"
          ],
          [
            "ADC2",
            "35"
          ]
          ,
          [
            "ADC3",
            "32"
          ]
          ,
          [
            "ADC4",
            "33"
          ]
          ,
          [
            "ADC5",
            "25"
          ]
          ,
          [
            "ADC6",
            "26"
          ]
          ,
          [
            "ADC7",
            "27"
          ]
          ,
          [
            "ADC8",
            "14"
          ]
          ,
          [
            "ADC9",
            "13"
          ]

        ]
      }
    ],
    "output": null,
    "colour": "#00ad49",
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "output",
    "message0": "output pin %1 | value %2 |",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "pin",
        "options": [
          [
            "39",
            "39"
          ],
          [
            "34",
            "34"
          ],
          [
            "35",
            "35"
          ]
          ,
          [
            "32",
            "32"
          ]
          ,
          [
            "33",
            "33"
          ]
          ,
          [
            "25",
            "25"
          ]
          ,
          [
            "26",
            "26"
          ]
          ,
          [
            "27",
            "27"
          ]
          ,
          [
            "14",
            "14"
          ]
          ,
          [
            "13",
            "13"
          ]
          ,
          [
            "Led BuiltIn",
            "2"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "pin_value",
        "check": "Number"
      },
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ff7c00",
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "input",
    "message0": "input pin %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "pin",
        "options": [
          [
            "39",
            "39"
          ],
          [
            "34",
            "34"
          ],
          [
            "35",
            "35"
          ]
          ,
          [
            "32",
            "32"
          ]
          ,
          [
            "33",
            "33"
          ]
          ,
          [
            "25",
            "25"
          ]
          ,
          [
            "26",
            "26"
          ]
          ,
          [
            "27",
            "27"
          ]
          ,
          [
            "14",
            "14"
          ]
          ,
          [
            "13",
            "13"
          ]
        ]
      },
    ],
    "output": null,
    "colour": "#00ad49",
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "servo",
    "message0": "servo %1 | degree %2 |",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "pin",
        "options": [
          [
            "1",
            "1"
          ],
          [
            "2",
            "2"
          ],
          [
            "3",
            "3"
          ]
          ,
          [
            "4",
            "4"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "degree",
        "check": "Number"
      },
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ff7c00",
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "waitsw1",
    "message0": "WaitSw1",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00ad49",
    "tooltip": "wait untill sw1",
    "helpUrl": ""
  },
]);
