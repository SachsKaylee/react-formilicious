cd packages

cd core
call npm install
call npm run build
cd storybook
call npm install
cd ..
cd ..

cd bulma
call npm install
call npm run build
cd storybook
call npm install
cd ..
cd ..

cd validator-pwned
call npm install
call npm run build
cd storybook
call npm install
cd ..
cd ..

cd example
call npm install
cd ..

cd ..
