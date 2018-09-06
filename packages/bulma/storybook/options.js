const nameOnlySymbol = Symbol("name-only");

export const nameOnly = fn => {
  fn[nameOnlySymbol] = true;
  return fn;
};

export default { showFunctions: false, functionValue: fn => fn[nameOnlySymbol] ? (fn.displayName || fn.name) : "() => { ... }" };