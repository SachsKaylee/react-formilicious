cd packages
rem https://stackoverflow.com/questions/649634/how-do-i-run-a-bat-file-in-the-background-from-another-bat-file

cd core
START /B CMD /C CALL yarn run watch [args [...]]
cd storybook
START /B CMD /C CALL yarn run start [args [...]]
cd ../..

cd bulma
START /B CMD /C CALL yarn run watch [args [...]]
cd storybook
START /B CMD /C CALL yarn run start [args [...]]
cd ../..

cd validator-pwned
START /B CMD /C CALL yarn run watch [args [...]]
cd storybook
START /B CMD /C CALL yarn run start [args [...]]
cd ../..

cd example
START /B CMD /C CALL yarn run start [args [...]]
cd ..
