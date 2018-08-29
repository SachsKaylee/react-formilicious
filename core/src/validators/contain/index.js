const defaultLocale = {
  'string': (contained) => `The value entered must contain "${contained}".`,
  'object': (contained) => `At least one of the entries must be "${contained}".`,
};

// todo: this is a really critical add-on. we will need to greatly expand upon it

const contain = (match, locale) => {
  if (!(match instanceof RegExp)) {
    match = new RegExp(match.pattern, "im");
  };
  return value => {
    if (value !== null && value !== undefined) {
      switch (typeof value) {
        case "string": {
          return {
            validated: containString(value, match) ? "ok" : "error",
            message: matches ? null : locale[string](match.toString())
          };
        }
      }
    }
    return { validated: "error", message: null };
  };
};

const containString = (value, match) => match.test(value);
