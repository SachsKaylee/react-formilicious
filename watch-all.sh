#!/bin/bash
npm --prefix ./packages/core run watch &
npm --prefix ./packages/core/storybook run start &
npm --prefix ./packages/bulma run watch &
npm --prefix ./packages/bulma/storybook run start &
npm --prefix ./packages/validator-pwned run watch &
npm --prefix ./packages/validator-pwned/storybook run start &
npm --prefix ./packages/example run start &
