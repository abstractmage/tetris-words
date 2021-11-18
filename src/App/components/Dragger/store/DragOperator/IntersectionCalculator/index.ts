import { Nullable } from 'src/App/types';
import { IntersectionData, IntersectionDataItem } from './types';

export class IntersectionCalculator {
  data: Nullable<IntersectionData> = null;

  static getIntersectionArea(element1: HTMLElement, element2: HTMLElement) {
    let height = 0;
    let width = 0;
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    const unionWidth =
      Math.max(rect1.x + rect1.width, rect2.x + rect2.width) - Math.min(rect1.x, rect2.x);
    const widthOfTwo = rect1.width + rect2.width;

    const unionHeight =
      Math.max(rect1.y + rect1.height, rect2.y + rect2.height) - Math.min(rect1.y, rect2.y);
    const heightOfTwo = rect1.height + rect2.height;

    if (unionWidth <= widthOfTwo) {
      width = widthOfTwo - unionWidth;
    }

    if (unionHeight <= heightOfTwo) {
      height = heightOfTwo - unionHeight;
    }

    return width * height;
  }

  static getIntersectionData(targetElement: HTMLElement, elements: HTMLElement[]) {
    return elements.map((element, i) => {
      const intersectionArea = this.getIntersectionArea(targetElement, element);

      return { index: i, element, area: intersectionArea };
    });
  }

  calculateIntersectedElements(targetElement: HTMLElement, elements: HTMLElement[]) {
    const data = IntersectionCalculator.getIntersectionData(targetElement, elements).filter(
      ({ area }) => area !== 0,
    );

    let prev: Nullable<IntersectionDataItem> = null;
    let current: Nullable<IntersectionDataItem> = null;

    if (this.data !== null && this.data.length !== 0) {
      prev = this.data.reduce((acc, currValue) => {
        if (acc.area > currValue.area) return acc;
        return currValue;
      });
    }

    this.data = data;

    if (this.data !== null && this.data.length !== 0) {
      current = this.data.reduce((acc, currValue) => {
        if (acc.area > currValue.area) return acc;
        return currValue;
      });
    }

    return { prev, current };
  }

  clearIntersection() {
    this.data = null;
  }
}
