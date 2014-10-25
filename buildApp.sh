#!/bin/bash
# My example bash script to compile and run in Genymotion
 
titanium build --platform android --sdk 3.4.0.GA --build-only;
 
adb install -r build/android/bin/LyfeCycle.apk;
 
if [ $# -eq 0 ]
then
exit 1
else
    if[ $1 -eq "debug" ]
        adb logcat TiAPI:D *:S;
    fi
    if[ $1 -eq "info" ]
        adb logcat TiAPI:I *:S;
    fi
fi