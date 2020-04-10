import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { lazy } from '../index';
import { importLazy } from '../test-utils';

describe('lazy', () => {
  test('should return component', () => {
    const TestComponent = lazy(
      () => import('./test-component.jsx'),
      { resolveComponent: payload => payload.wrongKey }
    );

    expect(typeof TestComponent).toBe('function');
    expect(TestComponent.displayName).toBe('LazyComponent');
  });

  test('should call console.warn when component is not resolved', async () => {
    jest.spyOn(global.console, 'warn');

    const LazyComponent = lazy(
      () => import('./test-component.jsx'),
      { resolveComponent: payload => payload.wrongKey }
    );

    const wrapper = mount(
      <LazyComponent />
    );

    await act(async () => {
      await importLazy(LazyComponent);
    });

    wrapper.update();

    expect(global.console.warn).toHaveBeenCalledTimes(1);
    expect(global.console.warn).toHaveBeenCalledWith([
      'Failed to resolve lazy component, received: undefined',
      'Fallback value will be displayed',
    ].join('\n'));
  });
});
