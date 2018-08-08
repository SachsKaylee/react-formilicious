import * as React from 'react';

import Form from '../../../src';
import TextField from '../../../src/fields/TextField';
import DemoBaseForm from '.';

class DevTestForm extends DemoBaseForm {
  render() {
    return (<Form
      data={{
        color: "#ffaa12",
        hidden: "🤖"
      }}
      onSubmit={this.onSubmit}
      elements={[
        {
          type: TextField,
          key: "password",
          name: "🤨 Enter your secure password",
          mode: "password",
          placeholder: "Hint: It's probably 'password'."
        },
        {
          type: TextField,
          key: "color",
          name: "🎨 Pick a color",
          mode: "color",
          placeholder: "Alle Farben dieser Welt"
        },
        {
          type: TextField,
          key: "date",
          name: "📆 Enter the deadline of that really important project",
          mode: "date",
          placeholder: "Hint: Yesterday?"
        },
        {
          type: TextField,
          key: "time",
          name: "⌚ What time is it?",
          mode: "time",
          placeholder: new Date().toLocaleTimeString()
        },
        {
          type: TextField,
          key: "datetime",
          name: "⏰ When should we wake you up?",
          mode: "datetime",
          placeholder: "No matter what you pick, it'll be too early."
        },
        {
          type: TextField,
          key: "week",
          name: "🛩️ In which week is your next vacation?",
          mode: "week",
          placeholder: "Next year."
        },
        {
          type: TextField,
          key: "email",
          name: "📧 Enter your email",
          mode: "email",
          placeholder: "Yes, we WILL send you spam. LOTS of it. (Best preview on mobile)"
        },
        /*{
          type: TextField,
          key: "file",
          name: "📁 Select a file... (There are better ways to do this)",
          mode: "file",
          placeholder: "Your my-passwords.txt"
        },*/
        /*{
          type: TextField,
          key: "image",
          name: "🖼️ Image (Don't click this, we don't support it yet.)",
          mode: "image",
          placeholder: "Returns X and Y coordinates of the click"
        },*/
        {
          type: TextField,
          key: "month",
          name: "✨ Your favourite month",
          mode: "month",
          placeholder: "I'm running out of (not) witty lines"
        },
        {
          type: TextField,
          key: "number",
          name: "🔢 1, 2, 3, 4...",
          mode: "number",
          placeholder: "Einz, Zwo, Drei, Vier..."
        },
        /*{
          type: TextField,
          key: "range",
          name: "🏆 Please rate react-formilicious",
          mode: "range",
          placeholder: "It's anoyomous! Promise!"
        },*/
        {
          type: TextField,
          key: "tel",
          name: "☎️ May we ask for your number?",
          mode: "tel",
          placeholder: "*Obviously* just for 2FA, won't see to advertisers. (Best preview on mobile)"
        },
        {
          type: TextField,
          key: "url",
          name: "📃 Your favourite social network",
          mode: "url",
          placeholder: "Who knows more about you than yourself? (Best preview on mobile)"
        },
        {
          type: TextField,
          key: "hidden",
          name: "🤖 Beep Boop Boop - I'm hidden, only bots can fill me out.",
          mode: "hidden",
          placeholder: "All hail our AI overlords"
        },
      ]} />);
  }
}

export const title = "TextField form";
export const subtitle = "Testing text fields.";
export default DevTestForm;