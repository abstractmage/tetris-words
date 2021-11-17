export type MouseDownHandler = () => void;
export type MouseEnterHandler = () => void;
export type MouseLeaveHandler = () => void;
export type MouseUpHandler = () => void;

export type EventTypeMap = {
  'mousedown': MouseDownHandler;
  'mouseenter': MouseEnterHandler;
  'mouseleave': MouseLeaveHandler;
  'mouseup': MouseUpHandler;
};

export type EventType = keyof EventTypeMap;

export type Options = {
  letter: string;
  color?: string;
};
