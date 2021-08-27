// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost:8080/api",

  firebaseConfig : {

    apiKey: "AIzaSyDyBowXpWXV9CzBnV2JypHkAA7HOCJv7x0",

    authDomain: "forgames-firebase.firebaseapp.com",

    projectId: "forgames-firebase",

    storageBucket: "forgames-firebase.appspot.com",

    messagingSenderId: "792116428348",

    appId: "1:792116428348:web:ff617bd2d73df9b824cd39"

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
