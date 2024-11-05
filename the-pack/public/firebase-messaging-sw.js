importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCuKLlv626JfBCgxKqp5Hl6pmJzj1G63oQ",
    authDomain: "the-pack-ssc.firebaseapp.com",
    projectId: "the-pack-ssc",
    storageBucket: "the-pack-ssc.firebasestorage.app",
    messagingSenderId: "345950670679",
    appId: "1:345950670679:web:ab976570a091a47cdd7812",
    measurementId: "G-RXKE13948M"
});

const messaging = firebase.messaging();

//handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification?.title || 'Background Message Title';
    const notificationOptions = {
      body: payload.notification?.body || 'Background Message body.',
      icon: '/the-pack/public/images/main-icon.png'  
    };

    //Notifies user
    if(self.registration){
      self.registration.showNotification(notificationTitle, notificationOptions);
    }
});

