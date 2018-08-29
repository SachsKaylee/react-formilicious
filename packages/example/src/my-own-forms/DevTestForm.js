import * as React from 'react';
import DemoBaseForm from '.';
import Form from '@react-formilicious/core';
import { pass } from '@react-formilicious/core/helpers/timeout';
import TextArea from '@react-formilicious/fields-bulma/TextArea';
import TextField from '@react-formilicious/fields-bulma/TextField';

class DevTestForm extends DemoBaseForm {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(data) {
    await pass(1000);
    throw [
      {
        key: "feedback",
        message: "We don't accept THAT kind of feedback!"
      },
      parseInt(data.rating, 10) < 10 && {
        key: "rating",
        message: "Boo! Way too low!"
      },
      "Overall, this form looks rather badly filled out."
    ];
    /*const error = new Error("We don't accept THAT kind of feedback!");
    error.key = "feedback";
    throw error;
    alert("The form was submitted!\n\n" + JSON.stringify(data, null, 2));*/
  }

  render() {
    return (<Form
      data={{
        feedback: "Just getting started with it, (hopefully!) excited to learn more."
      }}
      onSubmit={this.onSubmit}
      elements={[
        {
          type: TextField,
          key: "customerName",
          name: "🤑 Customer",
          placeholder: "The name of the customer that sent the feedback"
        },
        {
          type: TextField,
          key: "rating",
          name: "🥈 Rating",
          mode: "number",
          placeholder: "Your rating"
        },
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