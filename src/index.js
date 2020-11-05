import { useState, createElement } from 'react';

const getDefault = source => source
  ? source.default
  : undefined;

export const lazy = (doImport, { resolveComponent = getDefault } = {}) => {
  let data = null;
  let loaded = false;

  const LazyComponent = ({ fallback = null, ...props }) => {
    const [Component, setComponent] = useState(() => data);

    !loaded && doImport()
      .then(payload => {
        data = resolveComponent(payload);
        loaded = true;

        if (!data) {
          console.warn([
            `Failed to resolve lazy component, received: ${String(data) || '""'}`,
            'Fallback value will be displayed',
          ].join('\n'));
        }

        setComponent(() => data);
      })
      .catch(console.error);

    return loaded && Component
      ? createElement(Component, props)
      : fallback;
  };

  LazyComponent.displayName = 'LazyComponent';

  return LazyComponent;
};
