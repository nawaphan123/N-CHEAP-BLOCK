({
    name: "N-CHEAP", // Category Name
    description: "Extention for N-CHEAP BOARD",
    author: "Nawa Phansaen",
    category: "Device Control",
    version: "1.0.0",
    icon: "/static/icon.png", // Category icon
    color: "#d63838", // Category color (recommend some blocks color)
    blocks: [ // Blocks in Category
        {
            xml: '<label text="For Setup Board"></label>',
        },
        "setUp",
        {
            xml: '<label text="For Use Motor"></label>',
        },
        {
            xml: `
                <block type="motor_move">
                    <value name="L_speed">
                        <shadow type="math_number">
                            <field name="NUM">50</field>
                        </shadow>
                    </value>
                    <value name="R_speed">
                        <shadow type="math_number">
                            <field name="NUM">50</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="motor_forward">
                    <value name="fd_speed">
                        <shadow type="math_number">
                            <field name="NUM">50</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="motor_backward">
                    <value name="bk_speed">
                        <shadow type="math_number">
                            <field name="NUM">50</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="motor_spinLeft">
                    <value name="sl_speed">
                        <shadow type="math_number">
                            <field name="NUM">50</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="motor_spinRight">
                    <value name="sr_speed">
                        <shadow type="math_number">
                            <field name="NUM">50</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="motor_turnRight">
                    <value name="tr_speed">
                        <shadow type="math_number">
                            <field name="NUM">50</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="motor_turnLeft">
                    <value name="tl_speed">
                        <shadow type="math_number">
                            <field name="NUM">50</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        "motor_stop",
        {
            xml: '<label text="For Use Display"></label>',
        },
        /*--------------------------------oled------------------------*/ 
        {
            xml: `
                <block type="oled_print">
                    <value name="text">
                        <shadow type="text">
                            <field name="TEXT">Hello!</field>
                        </shadow>
                    </value>
                    <value name="x">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                    <value name="y">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        "oled_clearData",
        {
            xml: '<label text="For Use Input"></label>',
        },
        "mpu6050_get_Angle",
        "getSw1",
        "waitsw1",
        "knob",
        "sensor",
        "input",
        {
            xml: '<label text="For Use Output"></label>',
        },
        {
            xml: `
                <block type="Beep">
                    <value name="_time">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="servo">
                    <value name="degree">
                        <shadow type="math_number">
                            <field name="NUM">90</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="output">
                    <value name="pin_value">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                </block>
            `
        },

    ]
});
