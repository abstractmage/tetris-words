import { colors } from 'src/App/components/Cube/constants';
import { EventType } from './types';

export const eventNames: Record<EventType, EventType> = {
  'mousedown': 'mousedown',
  'mouseenter': 'mouseenter',
  'mouseleave': 'mouseleave',
  'mouseup': 'mouseup',
};

export const defaultColor = colors['#0ABA9A'];
