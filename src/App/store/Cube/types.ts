export type MouseDownHandler = () => void;
export type MouseEnterHandler = () => void;

export type EventTypeMap = {
  'mousedown': MouseDownHandler;
  'mouseenter': MouseEnterHandler;
};

export type EventType = keyof EventTypeMap;

export type Options = {
  letter: string;
  color?: string;
};
