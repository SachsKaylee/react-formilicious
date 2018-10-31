#!/bin/bash
npm --prefix ./packages/core install
npm --prefix ./packages/core run build
npm --prefix ./packages/core/storybook install
npm --prefix ./packages/bulma install
npm --prefix ./packages/bulma run build
npm --prefix ./packages/bulma/storybook install
npm --prefix ./packages/validator-pwned install
npm --prefix ./packages/validator-pwned run build
npm --prefix ./packages/validator-pwned/storybook install
npm --prefix ./packages/example install
