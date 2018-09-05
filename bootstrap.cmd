cd packages

cd core
call npm i
call npm run build
cd storybook
call npm i
cd ..
cd ..

cd bulma
call npm i
call npm run build
cd storybook
call npm i
cd ..
cd ..

cd validator-pwned
call npm i
call npm run build
cd ..

cd example
call npm i
cd ..

cd ..