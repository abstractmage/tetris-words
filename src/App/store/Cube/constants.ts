import { colors } from 'src/App/components/Cube/constants';
import { EventType } from './types';

export const eventNames: { [eventName in EventType]: eventName } = {
  'mousedown': 'mousedown',
  'mouseenter': 'mouseenter',
  'intersectionIn': 'intersectionIn',
  'intersectionOut': 'intersectionOut',
  'finishDrag': 'finishDrag',
};

export const defaultColor = colors['#0ABA9A'];
