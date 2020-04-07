import React, { useState } from 'react';
import prop from 'lodash/fp/prop';

const getDefault = prop('default');

export const lazy = (doImport, { resolveComponent = getDefault } = {}) => {
  let data = null;
  let loaded = false;

  const LoadableComponent = ({ fallback = null, ...props }) => {
    const [Component, setComponent] = useState(data);

    !loaded && doImport()
      .then(payload => {
        data = resolveComponent(payload);
        loaded = true;

        setComponent(() => data);
      })
      .catch(error => console.error(error));

    return loaded && Component
      ? <Component {...props} />
      : fallback;
  };

  LoadableComponent.displayName = 'LoadableComponent';

  return LoadableComponent;
};
