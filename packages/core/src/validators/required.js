const hasValue = value => {
  if (typeof value === "object") {
    return Object.keys(value).length !== 0;
  }
  return !!value;
};

const required = (message = "This field is required.") => value => ({
  validated: hasValue(value) ? "ok" : "error",
  message
});

export default required;