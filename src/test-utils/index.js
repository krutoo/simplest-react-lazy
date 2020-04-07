const mockedMark = Symbol('lazy:mocked');
const controlKey = Symbol('lazy:control');

export const mockLazy = originalLazy => (doImport, options) => {
  let resolveOriginal;

  const promise = new Promise(resolve => resolveOriginal = resolve);
  const lazyComponent = originalLazy(() => promise, options);

  lazyComponent[mockedMark] = true;
  lazyComponent[controlKey] = { doImport, resolveOriginal };

  return lazyComponent;
};

export const importLazy = async lazyComponent => {
  if (!lazyComponent || !lazyComponent[mockedMark]) {
    throw Error(`Expected a mocked lazy component, received: ${lazyComponent}`);
  }

  const { doImport, resolveOriginal } = lazyComponent[controlKey];
  const result = await doImport();

  resolveOriginal(result);
};
