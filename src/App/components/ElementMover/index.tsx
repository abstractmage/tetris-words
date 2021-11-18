import React from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import anime, { AnimeInstance } from 'animejs';
import { animeEasings } from 'src/App/constants';
import { Point } from 'src/App/types';
import { ElementMoverStore } from './store/ElementMoverStore';
import { useCombinedRefs } from 'src/App/shared/useCombinedRefs';
import { getOffset } from 'src/App/shared/getOffset';
import { Reparentable } from '../Reparentable';
import { CalculationHelper, DefaultComponentProps, ElementMoverProps } from './types';

const calculatePoint: CalculationHelper = (data) => data.currentTranslate;

const defaultPoint: Point = { x: 0, y: 0 };

export const ElementMover = observer(
  React.forwardRef(function ElementMover<P extends DefaultComponentProps, R extends HTMLElement>(
    props: ElementMoverProps<P>,
    ref: React.Ref<R>,
  ) {
    const {
      anchor: anchorProp,
      duration = 500,
      Component,
      style,
      easing = animeEasings.easeInOutQuad,
      bounded = true,
      translate = defaultPoint,
      withAnimation = true,
      calculationHelper = calculatePoint,
      reparentableContainerStyle,
      onMoving,
      onMovingEnd,
      ...otherProps
    } = props;

    const refCallbacks = React.useRef({ onMoving, onMovingEnd });

    React.useEffect(() => {
      refCallbacks.current = { onMoving, onMovingEnd };
    }, [onMoving, onMovingEnd]);

    const store = useLocalObservable(
      () => new ElementMoverStore({ anchor: anchorProp, translate, withAnimation }),
    );

    const innerRef = useCombinedRefs(ref);
    const animeRef = React.useRef<AnimeInstance | null>(null);

    const calculatedStyle: React.CSSProperties = React.useMemo(
      () => ({
        ...style,
        ...store.calculatedTransformStyle,
      }),
      [store.calculatedTransformStyle, style],
    );

    React.useEffect(() => {
      if (store.firstRender || !innerRef.current || !bounded) {
        return;
      }

      const offset = getOffset(anchorProp, innerRef.current);
      store.setAnchor(anchorProp);
      store.setTranslate({ x: offset.left, y: offset.top });
      // Не нужна реакция на innerRef
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anchorProp, store, bounded]);

    React.useEffect(() => store.setWithAnimation(withAnimation), [store, withAnimation]);

    React.useEffect(() => {
      if (!bounded) {
        store.setTranslate(translate);
      }
    }, [bounded, translate, store]);

    React.useEffect(() => {
      if (!bounded) {
        animeRef.current?.pause();
      }
    }, [bounded]);

    React.useEffect(() => store.setWithAnimation(withAnimation), [store, withAnimation]);

    React.useEffect(() => {
      if (!bounded) {
        store.setTranslate(translate);
      }
    }, [bounded, translate, store]);

    React.useEffect(() => {
      if (!bounded) {
        animeRef.current?.pause();
      }
    }, [bounded]);

    React.useEffect(() => {
      if (!bounded) return;

      const startTranslate = { ...store.translate };
      const currentTranslate = { ...store.translate };
      const finishTranslate = { x: 0, y: 0 };

      if (animeRef.current) {
        animeRef.current.pause();
      }

      if (store.withAnimation && !store.firstRender) {
        animeRef.current = anime({
          targets: currentTranslate,
          ...finishTranslate,
          duration,
          easing,
          update: () => {
            store.setTranslate(
              calculationHelper({
                startTranslate,
                currentTranslate,
                finishTranslate,
              }),
            );
            refCallbacks.current.onMoving?.(currentTranslate);
          },
          complete: () => {
            refCallbacks.current.onMovingEnd?.(finishTranslate);
          },
        });
      } else {
        store.setTranslate(finishTranslate);
      }

      // Нужна обработка изменения только anchor и bounded
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.anchor, bounded]);

    React.useEffect(() => () => animeRef.current?.pause(), []);

    React.useEffect(() => store.passFirstRender(), [store]);

    return (
      <Reparentable parent={store.anchor} containerStyle={reparentableContainerStyle}>
        <Component {...(otherProps as P)} ref={innerRef} style={calculatedStyle} />
      </Reparentable>
    );
  }),
) as <P extends DefaultComponentProps>(
  props: ElementMoverProps<P>,
  ref: React.Ref<HTMLElement>,
) => React.ReactElement;
