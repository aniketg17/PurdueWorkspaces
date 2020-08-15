# Purdue Workspaces
Purdue Workspaces is a CRUD mobile application developed using Javascript and React Native to allow Purdue students to form workspaces, or study groups, across campus for the course they would like.

## Motivation
Ever since I had joined Purdue and its subreddit on Reddit, I had noticed how, around the time of midterms or finals, students would post on Reddit asking for others who want to study the same subject to join their 'GroupMe chat'. There was no effective platform that would enable people who wanted to study a given subject to study with other strangers. Not to mention, many people who would have otherwise been interested in joining the study group would not know about the GroupMe if they do not use Reddit often. To overcome this problem and provide a seamless way of forming workspaces across campus whenever one feels like, I created this app. Now, others who want to join this workspace can do so within a few touchstrokes of their phone.

## Technologies Used
1. [React Native](https://reactnative.dev): An open-source mobile application framework to build cross-platform software by Facebook.
2. [Firebase](https://firebase.google.com): A mobile application development platform by Google.
	
	a) [Firestore](https://firebase.google.com/docs/firestore): A flexible, no-SQL database to maintain persistent storage of mobile application data.
3. [Google Places API](https://developers.google.com/places/web-service/overview): A service API that requests and provides information about geographic locations
	
	a) [Google Autocomplete](https://developers.google.com/places/web-service/autocomplete): Returns JSON objects of place predictions as user types into the search bar
4. [Purdue API](https://github.com/Purdue-io/PurdueApi/wiki/OData-Queries): A REST-ful API that provides Purdue course catalog information in JSON format and allows SQL-esque queries
5. [Native Base](https://nativebase.io): A cross-platform UI resource


## How to install
Run the following steps on command line:
1. Install React Native CLI: ```npm install --g react-native-cli```

2. Clone this repo: ```git clone https://github.com/aniketg17/PurdueWorkspaces.git```

3. Change directory into the repo and install the necessary dependencies: ```cd [Project folder name] && npm install ```

4. Install podfiles: ```cd ios && pod install && cd .. ```

## Quick start
1. Change directory into the repo: ```cd [Project folder name]```

2. Run the emulator: ```react-native run-ios ``` for iOS and ```react-native run-android ``` for Android

3. Wait for your simulator to open.

## Quick tidbits
1. As mentioned before, Firebase's Firestore is used to store data regarding the sessions. To maintain consistency in the database, whenever a timestamp for joining or creating a new session is recorded, to be safe, the time is converted into EST (Eastern Standard Time). 
2. All the locations that are rendered on ```purdueLocations.js``` are biased to be in and around Purdue University.
3. ```Purdue API``` gets updated often and reflects the current course catalog always. In those terms, the application is robust and will always include all of the given semester's courses and subjects.
4. The ideal way to delete sessions in the database is to delete the sessions when the time is past the sessions' end time. To do this, most likely a server or script that runs all the time is needed, which would cost money. To avoid this, the delete operation runs when a user tries to fetch sessions of a particular course. Only the workspace sessions that are active or yet to be active will be visible and the rest are deleted automatically. 

## Demo

