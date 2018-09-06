const nameOnlySymbol = Symbol("name-only");
const fullBodySymbol = Symbol("full-body");

export const fnNameOnly = fn => {
  fn[nameOnlySymbol] = true;
  return fn;
};

export const fnFullBody = fn => {
  fn[fullBodySymbol] = true;
  return fn;
};

const functionValue = fn => {
  if (fn[nameOnlySymbol]) {
    return fn.displayName || fn.name;
  }
  if(fn[fullBodySymbol] ) {
    return fn.toString();
  }
  return "() => { ... }";
}

export default { showFunctions: false, functionValue };