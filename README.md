       _               ___       _______            _               
      ( )             / __)     | ______)          | |         
      | |     _   _ _| |__ _____| |     _   _  ____| | _____   
      | |    | | | (_   __) ___ | |    | | | |/ ___) || ___ |  
      | |____| |_| | | |  | ____| |____| |_| ( (___| || ____|  
      |_______)__  | |_|  |_____)\______)__  |\____)\_)_____)  
             (____/                    (____/                  


**Get the Project:**

* Download and install Titanium, platform version 3.4.0 (If you use a different version, update this in the tiapp.xml file)
  * This can be found here: http://docs.appcelerator.com/titanium/3.0/#!/guide/Quick_Start
* Download/install/upgrade to the latest version of XCode
* To get bencoding's benCoding.Map module _(Thanks BenCoding!)_:  
* Navigate to https://github.com/benbahrenburg/benCoding.Map/blob/master/dist/bencoding.map-iphone-0.6.zip
and download the raw file  
* Within the unzipped file, copy the bencoding.map folder (should be in _modules/iphone_)
* Place this copied folder within _Library/Application Support/Titanium/modules/iphone_ 
* Clone this repository into it's own folder

<h3>To-Do</h3>
* ~~Cancel button zooms into current location~~
* ~~Cancel button removes pins~~
* MAJOR REFACTOR, removing all dependencies in files
	* We pass in a lot of objects into other objects. In truth, we don't need to do this if we use all the same names
	* This will help the consistency of the code, make it less confusing, etc.
* Add options page
* Add timer page
	* Easy capability: 
		* "Go"
		* "Stop"
		* Keeps time log, date, start and stop
	* Medium:
		* Ability to follow routes set
	* Hard:
		* Ability to upload routes to your profile
* Look at Socket.io for real time communication between riders
* Send out "looking for other rider" alert



Titanium stuff:

----------------------------------
Stuff our legal folk make us say:

Appcelerator, Appcelerator Titanium and associated marks and logos are 
trademarks of Appcelerator, Inc. 

Titanium is Copyright (c) 2008-2013 by Appcelerator, Inc. All Rights Reserved.

Titanium is licensed under the Apache Public License (Version 2). Please
see the LICENSE file for the full license.

