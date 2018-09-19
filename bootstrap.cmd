cd packages

cd core
call yarn
call yarn build
cd storybook
call yarn
cd ..
cd ..

cd bulma
call yarn
call npm run build
cd storybook
call yarn
cd ..
cd ..

cd validator-pwned
call yarn
call yarn build
cd storybook
call yarn
cd ..
cd ..

cd example
call yarn
cd ..

cd ..
