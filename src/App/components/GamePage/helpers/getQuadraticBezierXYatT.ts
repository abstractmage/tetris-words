import { Point } from 'src/App/types';

/**
 * Функция для получения координат части (part – от 0 до 1) кривой Безье,
 * построенной по трём точкам (startPoint, controlPoint, endPoint).
 * Удобно использовать для перемещения чего-либо по кривой линии,
 * когда известны начальные, конечные и текущие координаты.
 */
export const getQuadraticBezierXYatT = (
  startPoint: Point,
  controlPoint: Point,
  endPoint: Point,
  part: number,
) => {
  const x =
    (1 - part) ** 2 * startPoint.x +
    2 * (1 - part) * part * controlPoint.x +
    part ** 2 * endPoint.x;

  const y =
    (1 - part) ** 2 * startPoint.y +
    2 * (1 - part) * part * controlPoint.y +
    part ** 2 * endPoint.y;

  return { x, y };
};
