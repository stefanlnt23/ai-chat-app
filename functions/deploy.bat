@echo off
cd functions
call npm install
cd ..
call firebase deploy --only functions
