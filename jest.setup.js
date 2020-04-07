import { mockLazy } from './src/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('./src/index', () => {
  const original = jest.requireActual('./src/index');

  return {
    ...original,
    lazy: mockLazy(original.lazy),
  };
});
