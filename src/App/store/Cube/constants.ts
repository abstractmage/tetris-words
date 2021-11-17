import { colors } from 'src/App/components/Cube/constants';
import { EventType } from './types';

export const eventNames: Record<EventType, EventType> = {
  'mousedown': 'mousedown',
  'mouseenter': 'mouseenter',
};

export const defaultColor = colors['#0ABA9A'];
