import 'firebase/messaging'
import firebase from 'firebase/app'
import localforage from 'localforage'

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token')
  },

  init: async function () {
    if (!firebase.apps.length && process.env.NEXT_PUBLIC_FIREBASE_SENDERID) {
      firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDERID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
      })

      try {
        if ((await this.tokenInlocalforage()) !== null) {
          return false
        }

        const messaging = firebase.messaging()
        await messaging.requestPermission()
        const token = await messaging.getToken()

        localforage.setItem('fcm_token', token)
      } catch (error) {
        console.error(error)
      }
    }
  },
}

export { firebaseCloudMessaging }
