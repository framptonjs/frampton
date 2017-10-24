export interface EventDesc {
  bubbles: boolean;
}


export interface EventMap {
  [name: string]: EventDesc;
}


export const EVENT_MAP: EventMap = {
  abort: {
    bubbles: false
  },

  animationend: {
    bubbles: true
  },

  animationiteration: {
    bubbles: true
  },

  animationstart: {
    bubbles: true
  },

  blur: {
    bubbles: false
  },

  change: {
    bubbles: true
  },

  click: {
    bubbles: true
  },

  drag: {
    bubbles: true
  },

  dragend: {
    bubbles: true
  },

  dragenter: {
    bubbles: true
  },

  dragleave: {
    bubbles: true
  },

  dragover: {
    bubbles: true
  },

  dragstart: {
    bubbles: true
  },

  drop: {
    bubbles: true
  },

  error: {
    bubbles: false
  },

  focus: {
    bubbles: false
  },

  focusin: {
    bubbles: true
  },

  focusout: {
    bubbles: true
  },

  input: {
    bubbles: true
  },

  keydown: {
    bubbles: true
  },

  keypress: {
    bubbles: true
  },

  keyup: {
    bubbles: true
  },

  load: {
    bubbles: false
  },

  loadend: {
    bubbles: false
  },

  loadstart: {
    bubbles: false
  },

  mousedown: {
    bubbles: true
  },

  mouseenter: {
    bubbles: false
  },

  mouseleave: {
    bubbles: false
  },

  mousemove: {
    bubbles: true
  },

  mouseout: {
    bubbles: true
  },

  mouseover: {
    bubbles: true
  },

  mouseup: {
    bubbles: true
  },

  progress: {
    bubbles: false
  },

  submit: {
    bubbles: true
  },

  scroll: {
    bubbles: true
  },

  touchcancel: {
    bubbles: true
  },

  touchend: {
    bubbles: true
  },

  touchleave: {
    bubbles: true
  },

  touchmove: {
    bubbles: true
  },

  touchstart: {
    bubbles: true
  },

  transitionend: {
    bubbles: true
  },

  unload: {
    bubbles: false
  },

  wheel: {
    bubbles: true
  }
};


export function getEventDesc(name: string): EventDesc {
  if (EVENT_MAP[name]) {
    return EVENT_MAP[name];
  } else {
    return {
      bubbles: true
    };
  }
}