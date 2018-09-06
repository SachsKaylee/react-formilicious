import { setAddon, configure } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const loadStories = () => require("../");

configure(loadStories, module);
