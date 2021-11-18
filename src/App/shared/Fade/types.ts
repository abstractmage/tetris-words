import { ShowingEndHandler } from 'src/App/components/Fade/types';

export type EventType = 'showing-end';

export type EventTypeMap = {
  'showing-end': ShowingEndHandler;
};

export type Options = {
  shown?: boolean;
  duration?: number;
  onShowingEnd?: ShowingEndHandler;
};
