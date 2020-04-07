import { lazy } from '../src/';

export const LazyComponent = lazy(() => import('./component'));
