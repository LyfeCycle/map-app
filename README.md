 _               ___       _______            _        
( )             / __)     | ______)          | |       
| |     _   _ _| |__ _____| |     _   _  ____| | _____ 
| |    | | | (_   __) ___ | |    | | | |/ ___) || ___ |
| |____| |_| | | |  | ____| |____| |_| ( (___| || ____|
|_______)__  | |_|  |_____)\______)__  |\____)\_)_____)
       (____/                    (____/                

       To run this, clone the repository
       Navigate to project directory
       In terminal:
       	titanium build --platform android --sdk 3.4.0.GA --build-only
       	adb install -r build/android/bin/LyfeCycle.apk

       	(Might have to run)
       	adb kill-server
       	adb start-server
       	adb connect GENYMOTIONIPADDRESS

       	GENYMOTIONIPADDRESS can be found by installing Genymotion
       	and running the Genymotion shell then typing
       	devices list
       	Make sure Genymotion device is running to get IP address from 0.0.0.0

