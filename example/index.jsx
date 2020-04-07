import React, { useState } from 'react';
import { LazyComponent } from './lazy-component.jsx';

export const App = () => {
  const [show, toggleShow] = useState(false);

  return (
    <div>
      <h1>Test App</h1>
      <p>simplest-react-lazy example</p>

      <button onClick={() => toggleShow(!show)}>
        Show lazy component
      </button>

      {show && (
        <LazyComponent fallback='Loading...' />
      )}
    </div>
  );
};
