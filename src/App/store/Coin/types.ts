export type MovingEndHandler = () => void;

export type EventTypeMap = {
  movingEnd: MovingEndHandler;
};

export type EventType = keyof EventTypeMap;
