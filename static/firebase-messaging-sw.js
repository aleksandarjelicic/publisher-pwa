
/* global importScripts, firebase */
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js')
importScripts('/static/swenv.js')

firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDERID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
})

firebase.messaging()

