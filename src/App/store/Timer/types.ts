export type TickHandler = (data: { value: number }) => void;

export type EventTypeMap = {
  'tick': TickHandler;
};

export type EventType = keyof EventTypeMap;
