import * as React from 'react';

import Form from '../../../src';
import TextArea from '../../../src/fields/TextArea';
import DemoBaseForm from '.';
import { pass } from '../../../src/helpers/timeout';

class DevTestForm extends DemoBaseForm {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(data) {
    await pass(1000);
    const error = new Error("We don't accept THAT kind of feedback!");
    error.key = "feedback";
    throw error;
    alert("The form was submitted!\n\n" + JSON.stringify(data, null, 2));
  }

  render() {
    return (<Form
      data={{
        feedback: "Just getting started with it, (hopefully!) excited to learn more."
      }}
      onSubmit={this.onSubmit}
      elements={[
        {
          type: TextArea,
          key: "feedback",
          name: "❓ Feedback",
          lines: 4,
          placeholder: "Please send us some feedback about react-formilicious!"
        }
      ]} />);
  }
}

export const title = "Development Test Form";
export const subtitle = "Don't pay too much attention to me.";
export default DevTestForm;