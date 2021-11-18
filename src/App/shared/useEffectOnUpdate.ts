import React from 'react';

export const useEffectOnUpdate = (callback: React.EffectCallback, deps: React.DependencyList) => {
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return () => {};
    }

    return callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
};
