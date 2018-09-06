const nameOnlySymbol = Symbol("react-formilicious/name-only");
const fullBodySymbol = Symbol("react-formilicious/full-body");
const literalSymbol = Symbol("react-formilicious/literal");

export const fnNameOnly = fn => {
  fn[nameOnlySymbol] = true;
  return fn;
};

export const fnFullBody = fn => {
  fn[fullBodySymbol] = true;
  return fn;
};

export const fnLiteralExpression = fn => {
  const res = fn();
  res[literalSymbol] = getFunctionBody(fn);
  return res;
};

const getFunctionBody = fn => {
  const str = fn.toString();
  const matchOpen = str.match(/{\s*return/);
    // We either have an arrow function with a return statement in it or a normal function.
  if (matchOpen) {
    const open = matchOpen.index + matchOpen[0].length + 1;
    const matchClose = str.match(/;?\s*}(?=[^;?\s*}]*$)/);
    const close = matchClose.index;
    return str.slice(open, close).trim();
  }
  // It' s a one line arrow function
  const arrowOpener = str.match(/(.*)\s*=>/);
  const open = arrowOpener.index + arrowOpener[0].length + 1;
  return str.substring(open).trim();
}

const functionValue = fn => {
  if (fn[nameOnlySymbol]) {
    return fn.displayName || fn.name;
  }
  if (fn[fullBodySymbol]) {
    return fn.toString();
  }
  if (fn[literalSymbol]) {
    return fn[literalSymbol].toString();
  }
  return "() => { ... }";
}

export default { showFunctions: false, functionValue };