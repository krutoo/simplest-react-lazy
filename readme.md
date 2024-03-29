# Simplest React.lazy alternative

## Important

**It is no longer necessary to use this library, since Jest allows you to control the loading of dedynamic modules. Just use React.lazy instead.** 

...with able to fully coverage testing in Jest

## Why?

There are currently difficulties/problems with testing React Suspense/lazy in jest and enzyme.

This package provides alternative with almost same API and testing util.

## Install

```bash
# by npm
npm install --save simplest-react-lazy

# or yarn
yarn add simplest-react-lazy
```

## Usage

`component.jsx`

```jsx
import React from 'react';

const Component = () => (
  <div>It is just a component...</div>
);

export default Component;
```

`lazy-component.jsx`

```jsx
import { lazy } from 'simplest-react-lazy';

export const LazyComponent = lazy(() => import('./component'));
```

`index.jsx`
```jsx
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
        <LazyComponent fallback='Loading...' /> // no Suspense needed
      )}
    </div>
  );
};
```

## Jest testing example

First of all setup jest

```jsx
// in your jest setup file
import { mockLazy } from 'simplest-react-lazy/test-utils';

// ...other setup...

jest.mock('simplest-react-lazy', () => {
  const original = jest.requireActual('simplest-react-lazy');

  return {
    ...original,
    lazy: mockLazy(original.lazy),
  };
});
```

Write test with special util

```jsx
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { importLazy } from 'simplest-react-lazy/test-utils';
// ...import components...

describe('<App />', () => {
  test('should render lazy component', async () => {
    const wrapper = mount(<App />);

    expect(wrapper.find(Component)).toHaveLength(0);

    act(() => {
      wrapper.find('button').simulate('click');
    });

    wrapper.update();

    expect(wrapper.find(Component)).toHaveLength(0);

    // await import of module for lazy component
    await act(async () => {
      await importLazy(LazyComponent);
    });

    // update enzyme wrapper is required
    wrapper.update();

    expect(wrapper.find(Component)).toHaveLength(1);
  });
});
```

## To Do

- ~remove `lodash/fp/prop`~
- ~show warning when resolveComponent returns non valid React type~
