import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { importLazy } from '../../src/test-utils';
import { App } from '../index.jsx';
import { LazyComponent } from '../lazy-component.jsx';
import Component from '../component.jsx';

// example of testing lazy components
describe('App', () => {
  test('should render lazy component properly', async () => {
    const wrapper = mount(
      <App />
    );

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
