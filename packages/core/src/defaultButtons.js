const submit = {
  key: "submit",
  name: "✔️ Submit",
  action: "submit",
  type: "primary"
};

const reset = {
  key: "reset",
  name: "️❌ Reset",
  action: "reset",
  type: "danger"
};

let buttons;
const setButtons = newButtons => {
  buttons = newButtons;
}
setButtons([submit, reset]);

export {
  submit, reset,
  setButtons
};
export default () => buttons;