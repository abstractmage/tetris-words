import { Point } from 'src/App/types';

/**
 * Функция для получения координаты точки перпендикулярной линии
 * к линии point1, point2.
 */
export const getPerpendicularPointToMidpoint = (point1: Point, point2: Point, distance: number) => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  const midpoint = { x: point1.x + dx * 0.5, y: point1.y + dy * 0.5 };
  const angle = Math.atan2(dy, dx);
  const perpendicularPoint = {
    x: midpoint.x + distance * Math.cos(angle - Math.PI / 2),
    y: midpoint.y + distance * Math.sin(angle - Math.PI / 2),
  };
  return perpendicularPoint;
};
