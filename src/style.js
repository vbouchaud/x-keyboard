import {
  KEY_WIDTH,
  KEY_PADDING,
  KEY_BG,
  KEY_COLOR,
  KEY_COLOR_L3,
  KEY_COLOR_L5,
  DEAD_KEY_COLOR,
  SPECIAL_KEY_BG,
} from './constants.js';

const translate = (x = 0, y = 0, offset) => {
  const dx = KEY_WIDTH * x + (offset ? KEY_PADDING : 0);
  const dy = KEY_WIDTH * y + (offset ? KEY_PADDING : 0);
  return `{ transform: translate(${dx}px, ${dy}px); }`;
};

const trantate = (r = 0, x = 0, y = 0, offset) => {
  const dx = KEY_WIDTH * x + (offset ? KEY_PADDING : 0);
  const dy = KEY_WIDTH * y + (offset ? KEY_PADDING : 0);
  return `{ transform: translate(${dx}px, ${dy}px) rotate(${r}deg); }`;
};

const main = `
  rect, path {
    stroke: #666;
    stroke-width: .5px;
    fill: ${KEY_BG};
  }
  .specialKey,
  .specialKey rect,
  .specialKey path {
    fill: ${SPECIAL_KEY_BG};
  }
  text {
    fill: ${KEY_COLOR};
    font: normal 20px sans-serif;
    text-align: center;
  }
  #Backspace text {
    font-size: 12px;
  }
`;

// keyboard geometry: ANSI, ISO, ABNT, ALT
const classicGeometry = `
  #Escape { display: none; }

  #row_AE ${translate(0, 0, true)}
  #row_AD ${translate(0, 1, true)}
  #row_AC ${translate(0, 2, true)}
  #row_AB ${translate(0, 3, true)}
  #row_AA ${translate(0, 4, true)}

  /* Backslash + Enter */
  #Enter path.alt,
  #Enter     .iso,
  #Backslash .iso,
  .alt #Enter rect.ansi,
  .iso #Enter rect.ansi,
  .iso #Enter text.ansi,
  .alt #Backslash .ansi,
  .iso #Backslash .ansi { display: none; }
  #Enter text.ansi,
  .alt #Enter     .alt,
  .iso #Enter     .iso,
  .iso #Backslash .iso { display: block; }
  .iso #Backslash ${translate(12.75, 1)}
  .alt #Backslash ${translate(13.0, -1)}

  /* Backspace + IntlYen */
  #IntlYen, #Backspace .alt,
  .intlYen  #Backspace .ansi { display: none; }
  .intlYen  #Backspace .alt,
  .intlYen  #IntlYen { display: block; }

  /* ShiftLeft + IntlBackslash */
  #IntlBackslash, #ShiftLeft .iso,
  .intlBackslash  #ShiftLeft .ansi { display: none; }
  .intlBackslash  #ShiftLeft .iso,
  .intlBackslash  #IntlBackslash { display: block; }

  /* ShiftRight + IntlRo */
  #IntlRo, #ShiftRight .abnt,
  .intlRo  #ShiftRight .ansi { display: none; }
  .intlRo  #ShiftRight .abnt,
  .intlRo  #IntlRo { display: block; }
`;

const splitGeometry = `
  .specialKey .split,
  .specialKey .voyager,
  .voyager #row_AE .left #Backquote,
  .voyager #row_AE .right #Equal,
  .voyager #row_AE .right #Minus,
  .voyager #row_AE .right #Backspace,
  .voyager #row_AD .right #Backslash,
  .voyager #row_AD .right #BracketLeft,
  .voyager #row_AD .right #BracketRight,
  .voyager #row_AC .right #Quote,
  .voyager #row_AC .right #Enter,
  .voyager #row_AC .right #Enter text,

  .voyager #row_AD .left #Tab rect,
  .voyager #row_AC .left #CapsLock rect,
  .voyager #row_AB .left #ShiftLeft rect,

  .voyager #row_AB .right #ShiftRight rect,

  .voyager #row_AA .specialKey,
  .voyager #Backslash rect,
  .voyager #Space,
  .voyager .specialKey .ansi
  { display: none; }

  .voyager #row_AE .left #Escape,
  .voyager #row_AE .left #Escape .voyager,
  .voyager #row_AD .left #Tab,
  .voyager #row_AD .left #Tab .voyager,
  .voyager #row_AC .left #CapsLock,
  .voyager #row_AC .left #CapsLock .voyager,
  .voyager #row_AB .left #ShiftLeft,
  .voyager #row_AB .left #ShiftLeft .voyager,
  .voyager #row_AE .right #Delete,
  .voyager #row_AE .right #Delete .voyager,
  .voyager #row_AD .right #Backspace,
  .voyager #row_AD .right #Backspace .voyager,
  .voyager #row_AC .right #Enter,
  .voyager #row_AC .right #Enter .voyager,
  .voyager #row_AB .right #ShiftRight,
  .voyager #row_AB .right #ShiftRight .voyager,
  .voyager #row_AA .left #Space,
  .voyager #row_AA .left #Space .voyager,
  .voyager #row_AA .left #Enter,
  .voyager #row_AA .left #Enter .voyager,
  .voyager #row_AA .right #Backspace,
  .voyager #row_AA .right #Backspace .voyager,
  .voyager #row_AA .right #Space,
  .voyager #row_AA .right #Space .voyager
  { display: block; }

  .voyager #row_AD .left .specialKey .voyager ${translate(0.50)}
  .voyager #row_AC .left .specialKey .voyager ${translate(0.75)}
f  .voyager #Backslash ${translate(11.5)}

  .voyager #ShiftLeft ${translate(1.25)}

  .voyager #Digit2 ${translate(2, -0.2)}
  .voyager #KeyW ${translate(2.5, -0.2)}
  .voyager #KeyS ${translate(2.75, -0.2)}
  .voyager #KeyX ${translate(3.25, -0.2)}

  .voyager #Digit3 ${translate(3, -0.4)}
  .voyager #KeyE ${translate(3.5, -0.4)}
  .voyager #KeyD ${translate(3.75, -0.4)}
  .voyager #KeyC ${translate(4.25, -0.4)}

  .voyager #Digit4 ${translate(4, -0.2)}
  .voyager #KeyR ${translate(4.5, -0.2)}
  .voyager #KeyF ${translate(4.75, -0.2)}
  .voyager #KeyV ${translate(5.25, -0.2)}

  .voyager #Digit7 ${translate(7, -0.2)}
  .voyager #KeyU ${translate(7.5, -0.2)}
  .voyager #KeyJ ${translate(7.75, -0.2)}
  .voyager #KeyM ${translate(8.25, -0.2)}

  .voyager #Digit8 ${translate(8, -0.4)}
  .voyager #KeyI ${translate(8.5, -0.4)}
  .voyager #KeyK ${translate(8.75, -0.4)}
  .voyager #Comma ${translate(9.25, -0.4)}

  .voyager #Digit9 ${translate(9, -0.2)}
  .voyager #KeyO ${translate(9.5, -0.2)}
  .voyager #KeyL ${translate(9.75, -0.2)}
  .voyager #Period ${translate(10.25, -0.2)}

  .voyager #row_AA .left #Space       ${translate(6.5)}
  .voyager #row_AA #Enter       ${translate(7.5, 0.10)}
  .voyager #row_AA #Backspace   ${translate(5.5, 0.10)}
  .voyager #row_AA .right #Space       ${translate(6.5)}

  .split #row_AE       ${translate(1.50, 0.50, true)}
  .split #row_AD       ${translate(1.00, 1.50, true)}
  .split #row_AC       ${translate(0.75, 2.50, true)}
  .split #row_AB       ${translate(0.25, 3.50, true)}
  .split #row_AA       ${translate(0.50, 4.50, true)}

  .split .left         ${translate(-1)}
  .split .right        ${translate(1)}

  .mod {
    fill: #eee;
    font-size: 14px
  }

  .layer {
    fill: brown;
    font-size: 14px
  }

  .layerKey {
    fill: #e83
  }

  .dualKey {
    fill: #666;
  }

  .voyager .right .dualKey.alt {
    fill: #77d
  }

  .voyager .right .mod.alt {
    fill: navy
  }

  .voyager .layer,
  .voyager .layerKey,
  .voyager .mod,
  .voyager .dualKey {
    display: block;
  }

  .split #row_AA .left {
    transform-origin: top left;
  }
  .split #row_AA .left ${trantate(20, -1, -2.25)}

  .split #row_AA .right {
    transform-origin: top right;
  }
  .split #row_AA .right ${trantate(-20, 0.92, -2.64)}

  .voyager #Delete text,
  .voyager #Backspace text {
    font-size: 14px;
  }
`;

// ortholinear geometry: TypeMatrix (60%), OLKB (50%, 40%)
const orthoGeometry = `
  .specialKey   .ergo,
  .specialKey   .ol60,
  .specialKey   .ol50,
  .specialKey   .ol40,
  #Space        .ol60,
  #Space        .ol50,
  #Space        .ol40,
  #Backquote    .ol60,
  #BracketRight .ol60,
  #Equal        .ol60,
  .ergo #CapsLock,
  .ergo #Space      rect,
  .ergo #Backslash  rect,
  .ergo .specialKey rect,
  .ergo .specialKey text { display: none; }
  .ol50 #Escape,
  .ol40 #Escape,
  .ol60 #Space        .ol60,
  .ol50 #Space        .ol50,
  .ol40 #Space        .ol40,
  .ol60 #Backquote    .ol60,
  .ol60 #BracketRight .ol60,
  .ol60 #Backslash    .ol60,
  .ol60 #Equal        .ol60,
  .ol60 .specialKey   .ol60,
  .ol50 .specialKey   .ol50,
  .ol40 .specialKey   .ol40,
  .ergo .specialKey   .ergo { display: block; }

  .ol50 .pinkyKey, .ol50 #ContextMenu,
  .ol40 .pinkyKey, .ol40 #ContextMenu,
  .ol40 #row_AE .numberKey { display: none; }

  .ergo #row_AE       ${translate(1.50, 0, true)}
  .ergo #row_AD       ${translate(1.00, 1, true)}
  .ergo #row_AC       ${translate(0.75, 2, true)}
  .ergo #row_AB       ${translate(0.25, 3, true)}

  .ergo #Tab          ${translate(0.25)}
  .ergo #ShiftLeft    ${translate(1.00)}
  .ergo #ControlLeft  ${translate(1.25)}
  .ergo #MetaLeft     ${translate(2.50)}
  .ergo #AltLeft      ${translate(4.00)}
  .ergo #Space        ${translate(5.25)}
  .ergo #AltRight     ${translate(9.00)}
  .ergo #MetaRight    ${translate(10.5)}
  .ergo #ControlRight ${translate(12.5)}

  .ergo .left         ${translate(-0.25)}
  .ergo .right        ${translate(0.25)}

  .ol60 .left         ${translate(-1.25)}
  .ol60 #ControlRight ${translate(13.50)}
  .ol60 #Backquote    ${translate(-0.25)}
  .ol60 #ShiftRight   ${translate(13.25)}
  .ol60 #ContextMenu  ${translate(12.50)}
  .ol60 #Backslash    ${translate(11.50, 2)}
  .ol60 #Backspace    ${translate(4.625, 1)}
  .ol60 #Enter        ${translate(5.375, 1)}

  .ol50 #Escape       ${translate(-0.25)}
  .ol50 #Backspace    ${translate(11.00)}
  .ol50 #Enter        ${translate(11.75, -1)}

  .ol40 #Escape       ${translate(-0.25, 2)}
  .ol40 #Backspace    ${translate(11.00, 1)}
  .ol40 #Enter        ${translate(11.75, 0)}

  [platform="gnu"].ergo .specialKey .win,
  [platform="gnu"].ergo .specialKey .mac,
  [platform="win"].ergo .specialKey .gnu,
  [platform="win"].ergo .specialKey .mac { display: none; }
  .ergo .specialKey .mac,
  [platform="gnu"].ergo .specialKey .gnu,
  [platform="win"].ergo .specialKey .win { display: block; }

  /* swap Alt/Meta for MacOSX */
  [platform="gnu"].ergo #MetaLeft,
  [platform="win"].ergo #MetaLeft,
                  .ergo #AltLeft   ${translate(2.5)}
  [platform="gnu"].ergo #AltLeft,
  [platform="win"].ergo #AltLeft,
                  .ergo #MetaLeft  ${translate(4.0)}
  [platform="gnu"].ergo #AltRight,
  [platform="win"].ergo #AltRight,
                  .ergo #MetaRight ${translate(9.5)}
  [platform="gnu"].ergo #MetaRight,
  [platform="win"].ergo #MetaRight,
                  .ergo #AltRight  ${translate(11.0)}
`;

// Korean + Japanese input systems
const cjkKeys = `
  #NonConvert, #Convert, #KanaMode,
  #Lang1, #Lang2,
  #Space .jis,
  #Space .ks,
  .ks  #Space .ansi,
  .ks  #Space .jis,
  .jis #Space .ansi,
  .jis #Space .ks { display: none; }
  .ks  #Space .ks,
  .jis #NonConvert, .jis #Convert, .jis #KanaMode,
  .ks #Lang1, .ks #Lang2,
  .jis #Space .jis { display: block; }

  #Backquote .jis,
  #CapsLock  .jis,
  .jis #Backquote .ansi,
  .jis #CapsLock  .ansi { display: none; }
  .jis #Backquote .jis,
  .jis #CapsLock .jis { display: block; }

  #Lang1 text,
  #Lang2 text,
  #Convert text,
  #NonConvert text,
  .jis #CapsLock text { font-size: 14px; }
  #KanaMode text,
  .jis #Backquote text { font-size: 10px; }
`;

// Windows / MacOSX / Linux modifiers
const modifiers = `
  .specialKey .win,
  .specialKey .gnu {
    display: none;
    font-size: 14px;
  }

  /* display MacOSX by default */
  [platform="gnu"] .specialKey .win,
  [platform="gnu"] .specialKey .mac,
  [platform="win"] .specialKey .gnu,
  [platform="win"] .specialKey .mac { display: none; }
  [platform="mac"] .specialKey .mac,
  [platform="gnu"] .specialKey .gnu,
  [platform="win"] .specialKey .win { display: block; }

  /* swap Alt/Meta for MacOSX */
  [platform="gnu"] #MetaLeft,
  [platform="win"] #MetaLeft,  #AltLeft   ${translate(1.25)}
  [platform="gnu"] #AltLeft,
  [platform="win"] #AltLeft,   #MetaLeft  ${translate(2.50)}
  [platform="gnu"] #AltRight,
  [platform="win"] #AltRight,  #MetaRight ${translate(10.00)}
  [platform="gnu"] #MetaRight,
  [platform="win"] #MetaRight, #AltRight  ${translate(11.25)}
`;

// color themes
const themes = `
  g:target rect, .press rect,
  g:target path, .press path {
    fill: #aad;
  }

  [theme="reach"] .pinkyKey  rect { fill: hsl(  0, 100%, 90%); }
  [theme="reach"] .numberKey rect { fill: hsl( 42, 100%, 90%); }
  [theme="reach"] .letterKey rect { fill: hsl(122, 100%, 90%); }
  [theme="reach"] .homeKey   rect { fill: hsl(122, 100%, 75%); }
  [theme="reach"] .press     rect { fill: #aaf; }

  [theme="hints"] [finger="m1"] rect { fill: hsl(  0, 100%, 95%); }
  [theme="hints"] [finger="l2"] rect { fill: hsl( 42, 100%, 85%); }
  [theme="hints"] [finger="r2"] rect { fill: hsl( 61, 100%, 85%); }
  [theme="hints"] [finger="l3"] rect,
  [theme="hints"] [finger="r3"] rect { fill: hsl(136, 100%, 85%); }
  [theme="hints"] [finger="l4"] rect,
  [theme="hints"] [finger="r4"] rect { fill: hsl(200, 100%, 85%); }
  [theme="hints"] [finger="l5"] rect,
  [theme="hints"] [finger="r5"] rect { fill: hsl(230, 100%, 85%); }
  [theme="hints"] .specialKey   rect,
  [theme="hints"] .specialKey   path { fill: ${SPECIAL_KEY_BG}; }
  [theme="hints"] .hint         rect { fill: #a33; }
  [theme="hints"] .press        rect { fill: #335; }
  [theme="hints"] .press        text { fill: #fff; }
  [theme="hints"] .hint text {
    font-weight: bold;
    fill: white;
  }

  /* dimmed AltGr + bold dead keys */
  .level3, .level4 { fill: ${KEY_COLOR_L3}; opacity: .5; }
  .level5, .level6 { fill: ${KEY_COLOR_L5}; }
  .deadKey {
    fill: ${DEAD_KEY_COLOR};
    font-size: 14px;
  }
  .diacritic  {
    font-size: 20px;
    font-weight: bolder;
  }

  /* hide Level4 (Shift+AltGr) unless AltGr is pressed */
  .level4        { display: none; }
  .altgr .level4 { display: block; }

  /* highlight AltGr + Dead Keys */
  .dk .level1, .altgr .level1,
  .dk .level2, .altgr .level2 { opacity: 0.25; }
  .dk .level5, .altgr .level3,
  .dk .level6, .altgr .level4 { opacity: 1; }
  .dk .level3,
  .dk .level4 { display: none; }

  @media (prefers-color-scheme: dark) {
    rect, path { stroke: #777; fill: #444; }
    .specialKey, .specialKey rect, .specialKey path { fill: #333; }
    g:target rect, .press rect, g:target path, .press path { fill: #558; }
    text { fill: #bbb; }
    .level3, .level4 { fill: #99f; }
    .level5, .level6 { fill: #6d6; }
    .deadKey { fill: #f44; }

    [theme="reach"] .pinkyKey  rect { fill: hsl(  0, 20%, 30%); }
    [theme="reach"] .numberKey rect { fill: hsl( 35, 25%, 30%); }
    [theme="reach"] .letterKey rect { fill: hsl( 61, 30%, 30%); }
    [theme="reach"] .homeKey   rect { fill: hsl(136, 30%, 30%); }
    [theme="reach"] .press     rect { fill: #449; }

    [theme="hints"] [finger="m1"] rect { fill: hsl(  0, 25%, 30%); }
    [theme="hints"] [finger="l2"] rect { fill: hsl( 31, 30%, 30%); }
    [theme="hints"] [finger="r2"] rect { fill: hsl( 61, 30%, 30%); }
    [theme="hints"] [finger="l3"] rect,
    [theme="hints"] [finger="r3"] rect { fill: hsl(136, 30%, 30%); }
    [theme="hints"] [finger="l4"] rect,
    [theme="hints"] [finger="r4"] rect { fill: hsl(200, 30%, 30%); }
    [theme="hints"] [finger="l5"] rect,
    [theme="hints"] [finger="r5"] rect { fill: hsl(230, 30%, 30%); }
    [theme="hints"] .specialKey   rect,
    [theme="hints"] .specialKey   path { fill: #333; }
    [theme="hints"] .hint         rect { fill: #a33; }
    [theme="hints"] .press        rect { fill: #335; }
    [theme="hints"] .press        text { fill: #fff; }
    [theme="hints"] .hint text {
      font-weight: bold;
      fill: white;
    }
  }
`;

// export full stylesheet
const style = `
  ${main}
  ${classicGeometry}
  ${orthoGeometry}
  ${splitGeometry}
  ${cjkKeys}
  ${modifiers}
  ${themes}
`;
export default style;
