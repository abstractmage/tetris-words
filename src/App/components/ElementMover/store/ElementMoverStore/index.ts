import { makeAutoObservable } from 'mobx';
import React from 'react';
import { Point } from 'src/App/types';
import { Options } from './types';

export class ElementMoverStore {
  translate!: Point;

  anchor!: HTMLElement;

  withAnimation = false;

  firstRender = true;

  constructor(options: Options) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.setAnchor(options.anchor);
    this.setTranslate(options.translate);
    this.setWithAnimation(options.withAnimation);
  }

  get calculatedTransformStyle(): React.CSSProperties {
    return { transform: `translate(${this.translate.x}px, ${this.translate.y}px)` };
  }

  passFirstRender() {
    this.firstRender = false;
  }

  setTranslate(value: Point) {
    this.translate = value;
  }

  setAnchor(newAnchor: HTMLElement) {
    this.withAnimation = true;
    this.anchor = newAnchor;
  }

  setWithAnimation(withAnimation: boolean) {
    this.withAnimation = withAnimation;
  }
}
