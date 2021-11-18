import { colors } from 'src/App/components/Cube/constants';
import { EventType } from './types';

export const eventNames: { [eventName in EventType]: eventName } = {
  'mousedown': 'mousedown',
  'mouseenter': 'mouseenter',
  'mouseup': 'mouseup',
  'intersectionIn': 'intersectionIn',
  'intersectionOut': 'intersectionOut',
  'startDrag': 'startDrag',
  'finishDrag': 'finishDrag',
};

export const defaultColor = colors['#0ABA9A'];
