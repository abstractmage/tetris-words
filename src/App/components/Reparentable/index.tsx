import React from 'react';
import ReactDOM from 'react-dom';
import { entries } from 'lodash';
import { ReparentableProps } from './types';

export const Reparentable = (props: ReparentableProps) => {
  const { className, parent, containerStyle, children } = props;
  const portalContainer = React.useMemo(() => {
    const element = document.createElement('div');
    element.style.width = '100%';
    element.style.height = '100%';
    return element;
  }, []);

  React.useLayoutEffect(() => {
    const pairs = entries(containerStyle);
    pairs.forEach(([name, value]) => {
      // @ts-ignore
      portalContainer.style[name] = value;
    });
  }, [containerStyle, portalContainer.style]);

  React.useLayoutEffect(() => {
    portalContainer.className = className ?? '';
  }, [className, portalContainer]);

  React.useLayoutEffect(() => {
    parent.appendChild(portalContainer);
  }, [parent, portalContainer]);

  React.useLayoutEffect(() => () => portalContainer.remove(), [portalContainer]);

  return ReactDOM.createPortal(children, portalContainer);
};
