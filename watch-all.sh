#!/bin/bash
yarn --cwd ./packages/core run watch &
yarn --cwd ./packages/core/storybook run start &
yarn --cwd ./packages/bulma run watch &
yarn --cwd ./packages/bulma/storybook run start &
yarn --cwd ./packages/validator-pwned run start &
yarn --cwd ./packages/validator-pwned/storybook run start &
yarn --cwd ./packages/example run start &
