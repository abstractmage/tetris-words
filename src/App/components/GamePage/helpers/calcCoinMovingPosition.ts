import { CalculationHelper } from '../../ElementMover/types';
import { getQuadraticBezierXYatT } from './getQuadraticBezierXYatT';
import { getPerpendicularPointToMidpoint } from './getPerpendicularPointToMidpoint';

export const calcCoinMovingPosition: CalculationHelper = ({
  startTranslate,
  finishTranslate,
  currentTranslate,
}) => {
  const length = Math.sqrt(
    (startTranslate.x - finishTranslate.x) ** 2 + (startTranslate.y - finishTranslate.y) ** 2,
  );

  const currentLength = Math.sqrt(
    (startTranslate.x - currentTranslate.x) ** 2 + (startTranslate.y - currentTranslate.y) ** 2,
  );

  return getQuadraticBezierXYatT(
    startTranslate,
    getPerpendicularPointToMidpoint(startTranslate, finishTranslate, length / 2),
    finishTranslate,
    currentLength / length,
  );
};
