import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyDtW9mqo_iwWOlVuk9KVxkuM_5T3ESmBY8',
  authDomain: 'new-conversations.firebaseapp.com',
  databaseURL: 'https://new-conversations.firebaseio.com',
  projectId: 'new-conversations',
  storageBucket: 'new-conversations.appspot.com',
  messagingSenderId: '667560607260'
}

if (!firebase.apps.length) firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export default firebase
