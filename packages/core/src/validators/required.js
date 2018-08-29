const required = (message = "This field is required.") => value => ({
  validated: value ? "ok" : "error",
  message
});

export default required;