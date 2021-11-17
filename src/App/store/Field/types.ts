export type MouseUpHandler = () => void;

export type EventTypeMap = {
  'mouseup': MouseUpHandler;
};

export type EventType = keyof EventTypeMap;
