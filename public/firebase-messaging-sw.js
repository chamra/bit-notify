// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.4/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyA_FVvvqm0I6YS7qSeRnrwyE08VGPA3JX4",
    authDomain: "bit-notify.firebaseapp.com",
    projectId: "bit-notify",
    storageBucket: "bit-notify.appspot.com",
    messagingSenderId: "758732043846",
    appId: "1:758732043846:web:12ac60f0a0571a2f74bc47",
    measurementId: "G-V5579995CH"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {

    console.log("listening ");
    console.log(payload);

    var options = {
        icon: '/logo512.png',
        click_action: "https://bit-notify.web.app/"
    };

    return self.registration.showNotification("BIT NOTIFY : New Announcement", options);
})