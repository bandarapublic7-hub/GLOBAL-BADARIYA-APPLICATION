# Global Badariya Campus App

Expo and React Native app for Global Badariya Institute of Engineering and Management. The original browser mockup is kept in `global badariya.html`.

## Project layout

```text
App.js                         Expo entry point
app.json                       Expo app identity and native settings
eas.json                       APK and store build profiles
assets/GlobalLogoB.png         Institute wordmark used in the app
assets/app-icon.png            User-provided launcher icon
src/
  components/                  Shared logo, avatar, and information rows
  constants/theme.js           Brand colors and text
  context/ProfileContext.js    Profile state and on-device persistence
  navigation/RootNavigator.js  Bottom tabs and edit-profile stack route
  screens/                     Home, Timetable, Attendance, Profile, Edit Profile
```

## Run in development

Install Node.js 20.19 or newer, then run:

```sh
npm install
npx expo start
```

Use Expo Go to scan the QR code, or run `npm run android` with Android Studio and an emulator configured.

## Generate an Android project or APK

To create the native Android project locally, run `npm run prebuild:android`. Expo generates the `android/` folder from the app config and plugins.

To build a directly installable APK with EAS, sign in to an Expo account and run:

```sh
npx eas-cli build --platform android --profile apk
```

EAS returns a download link for the APK when the remote build finishes. The `production` profile makes an Android App Bundle for store distribution.

## Current screens

- Home provides the campus shortcuts and links to the schedule and attendance tabs.
- Profile and Edit Profile show editable student details and a profile photo picker. Saved changes persist on the device.
- Timetable and Attendance are structured starter screens, ready to connect to institute data.

## Original prototype

`global badariya.html` remains as the browser version, including the two independently draggable looping half-wheel menus.
