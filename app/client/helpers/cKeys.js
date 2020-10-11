"use strict";

const k = {
    LEFT_MOUSE_BUTTON: 0x01, // VK_LBUTTON
    RIGHT_MOUSE_BUTTON: 0x02, // VK_RBUTTON
    CONTROL_BREAK_PROCESSING: 0x03, // VK_CANCEL
    MIDDLE_MOUSE_BUTTON_THREE_BUTTON_MOUSE: 0x04, // VK_MBUTTON
    X1_MOUSE_BUTTON: 0x05, // VK_XBUTTON1
    X2_MOUSE_BUTTON: 0x06, // VK_XBUTTON2
    BACKSPACE_KEY: 0x08, // VK_BACK
    TAB_KEY: 0x09, // VK_TAB
    CLEAR_KEY: 0x0C, // VK_CLEAR
    ENTER_KEY: 0x0D, // VK_RETURN
    SHIFT_KEY: 0x10, // VK_SHIFT
    CTRL_KEY: 0x11, // VK_CONTROL
    ALT_KEY: 0x12, // VK_MENU
    PAUSE_KEY: 0x13, // VK_PAUSE
    CAPS_LOCK_KEY: 0x14, // VK_CAPITAL
    SPACEBAR: 0x20, // VK_SPACE
    PAGE_UP_KEY: 0x21, // VK_PRIOR
    PAGE_DOWN_KEY: 0x22, // VK_NEXT
    END_KEY: 0x23, // VK_END
    HOME_KEY: 0x24, // VK_HOME
    LEFT_ARROW_KEY: 0x25, // VK_LEFT
    UP_ARROW_KEY: 0x26, // VK_UP
    RIGHT_ARROW_KEY: 0x27, // VK_RIGHT
    DOWN_ARROW_KEY: 0x28, // VK_DOWN
    INS_KEY: 0x2D, // VK_INSERT
    DEL_KEY: 0x2E, // VK_DELETE
    HELP_KEY: 0x2F, // VK_HELP
    _0_KEY: 0x30,
    _1_KEY: 0x31,
    _2_KEY: 0x32,
    _3_KEY: 0x33,
    _4_KEY: 0x34,
    _5_KEY: 0x35,
    _6_KEY: 0x36,
    _7_KEY: 0x37,
    _8_KEY: 0x38,
    _9_KEY: 0x39,
    A_KEY: 0x41,
    B_KEY: 0x42,
    C_KEY: 0x43,
    D_KEY: 0x44,
    E_KEY: 0x45,
    F_KEY: 0x46,
    G_KEY: 0x47,
    H_KEY: 0x48,
    I_KEY: 0x49,
    J_KEY: 0x4A,
    K_KEY: 0x4B,
    L_KEY: 0x4C,
    M_KEY: 0x4D,
    N_KEY: 0x4E,
    O_KEY: 0x4F,
    P_KEY: 0x50,
    Q_KEY: 0x51,
    R_KEY: 0x52,
    S_KEY: 0x53,
    T_KEY: 0x54,
    U_KEY: 0x55,
    V_KEY: 0x56,
    W_KEY: 0x57,
    X_KEY: 0x58,
    Y_KEY: 0x59,
    Z_KEY: 0x5A,
    NUMERIC_KEYPAD_0_KEY: 0x60, // VK_NUMPAD0
    NUMERIC_KEYPAD_1_KEY: 0x61, // VK_NUMPAD1
    NUMERIC_KEYPAD_2_KEY: 0x62, // VK_NUMPAD2
    NUMERIC_KEYPAD_3_KEY: 0x63, // VK_NUMPAD3
    NUMERIC_KEYPAD_4_KEY: 0x64, // VK_NUMPAD4
    NUMERIC_KEYPAD_5_KEY: 0x65, // VK_NUMPAD5
    NUMERIC_KEYPAD_6_KEY: 0x66, // VK_NUMPAD6
    NUMERIC_KEYPAD_7_KEY: 0x67, // VK_NUMPAD7
    NUMERIC_KEYPAD_8_KEY: 0x68, // VK_NUMPAD8
    NUMERIC_KEYPAD_9_KEY: 0x69, // VK_NUMPAD9
    F1_KEY: 0x70, // VK_F1
    F2_KEY: 0x71, // VK_F2
    F3_KEY: 0x72, // VK_F3
    F4_KEY: 0x73, // VK_F4
    F5_KEY: 0x74, // VK_F5
    F6_KEY: 0x75, // VK_F6
    F7_KEY: 0x76, // VK_F7
    F8_KEY: 0x77, // VK_F8
    F9_KEY: 0x78, // VK_F9
    F10_KEY: 0x79, // VK_F10
    F11_KEY: 0x7A, // VK_F11
    F12_KEY: 0x7B, // VK_F12
    F13_KEY: 0x7C, // VK_F13
    F14_KEY: 0x7D, // VK_F14
    F15_KEY: 0x7E, // VK_F15
    F16_KEY: 0x7F, // VK_F16
    F17_KEY: 0x80, // VK_F17
    F18_KEY: 0x81, // VK_F18
    F19_KEY: 0x82, // VK_F19
    F20_KEY: 0x83, // VK_F20
    F21_KEY: 0x84, // VK_F21
    F22_KEY: 0x85, // VK_F22
    F23_KEY: 0x86, // VK_F23
    F24_KEY: 0x87, // VK_F24
    NUM_LOCK_KEY: 0x90, // VK_NUMLOCK
    SCROLL_LOCK_KEY: 0x91, // VK_SCROLL
    LEFT_SHIFT_KEY: 0xA0, // VK_LSHIFT
    RIGHT_SHIFT_KEY: 0xA1, // VK_RSHIFT
    LEFT_CONTROL_KEY: 0xA2, // VK_LCONTROL
    RIGHT_CONTROL_KEY: 0xA3, // VK_RCONTROL
};

const keys = mp.keys;

keys.bind(k.E_KEY, false, function() {
    if (mp.gui.cursor.visible) return;
    mp.events.callRemote('sKeys-E');
});