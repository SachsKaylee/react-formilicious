cd packages
rem https://stackoverflow.com/questions/649634/how-do-i-run-a-bat-file-in-the-background-from-another-bat-file
START /B CMD /C CALL yarn run --prefix core watch [args [...]]
START /B CMD /C CALL yarn run --prefix bulma watch [args [...]]
START /B CMD /C CALL yarn run --prefix validator-pwned watch [args [...]]
