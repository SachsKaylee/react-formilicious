#!/bin/bash
yarn --cwd ./packages/core
yarn --cwd ./packages/core run build
yarn --cwd ./packages/core/storybook
yarn --cwd ./packages/bulma
yarn --cwd ./packages/bulma run build
yarn --cwd ./packages/bulma/storybook
yarn --cwd ./packages/validator-pwned
yarn --cwd ./packages/validator-pwned run build
yarn --cwd ./packages/validator-pwned/storybook
yarn --cwd ./packages/example
