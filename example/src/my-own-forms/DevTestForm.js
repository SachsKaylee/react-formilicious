import * as React from 'react';

import Form from '../../../src';
import TextArea from '../../../src/fields/TextArea';
import DemoBaseForm from ".";

class DevTestForm extends DemoBaseForm {
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
