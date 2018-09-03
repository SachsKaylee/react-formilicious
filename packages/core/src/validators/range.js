const defaultLocale = {
  'string.minmax': (min, max, is) => `The value entered must be between ${min} and ${max} characters long. (It has ${is} ${is === 1 ? "character" : "characters"})`,
  'string.min': (min, max, is) => `The value entered must have at least ${min} ${min === 1 ? "character" : "characters"}. (It has ${is} ${is === 1 ? "character" : "characters"})`,
  'string.max': (min, max, is) => `The value entered may not be longer than ${max} ${max === 1 ? "character" : "characters"}. (It has ${is} ${is === 1 ? "character" : "characters"})`,

  'number.minmax': (min, max, is) => `The number must be between ${min} and ${max}.`,
  'number.min': (min, max, is) => `The number must be larger than ${min}.`,
  'number.max': (min, max, is) => `The number may not be smaller than ${max}.`,

  'object.minmax': (min, max, is) => `The value must have between ${min} and ${max} entries. (It has ${is} ${is === 1 ? "entry" : "entries"})`,
  'object.min': (min, max, is) => `The value must have more than ${min} ${min === 1 ? "entry" : "entries"}. (It has ${is} ${is === 1 ? "entry" : "entries"})`,
  'object.max': (min, max, is) => `The value may not have less than ${max} ${max === 1 ? "entry" : "entries"}. (It has ${is} ${is === 1 ? "entry" : "entries"})`
};

const range = ({ min, max }, locale = defaultLocale) => value => {
  switch (typeof value) {
    case "string": return {
      validated: numberInRange(min, max, value.length) ? "ok" : "error",
      message: locale[localeKey("string", min, max)](min, max, value.length)
    };
    case "number": return {
      validated: numberInRange(min, max, value) ? "ok" : "error",
      message: locale[localeKey("number", min, max)](min, max, value)
    };
    case "object": {
      const keyCount = Object.keys(value).length;
      return {
        validated: numberInRange(min, max, keyCount) ? "ok" : "error",
        message: locale[localeKey("object", min, max)](min, max, keyCount)
      };
    }
    default: {
      console.error("[react-formilicious] Cannot validate the given value as a range", value);
      return { validated: "error", message: null };
    }
  }
}

const localeKey = (prefix, min, max) => {
  const localeKey = prefix + "." + (min !== undefined ? "min" : "") + (max !== undefined ? "max" : "");
  return localeKey;
}

const numberInRange = (min, max, number) => {
  if (min !== undefined && number < min) return false;
  if (max !== undefined && number > max) return false;
  return true;
};

export default range;