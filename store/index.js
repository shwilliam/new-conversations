import { auth, firestore, storage } from '@/services/firebase'

export const state = () => ({
  user: null
})

export const mutations = {
  signUp(state, { nickname, email, password, callback }) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        state.user = user
        firestore
          .collection('users')
          .doc(user.uid)
          .set({
            id: user.uid,
            nickname
          })
          .catch((error) => {
            console.error(error.code, error.message) // eslint-disable-line
          })
          .finally(() => {
            callback()
          })
      })
      .catch((error) => {
        console.error(error.code, error.message) // eslint-disable-line
      })
  },
  logIn(state, { email, password, callback }) {
    auth.signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        state.user = user
        callback()
      })
      .catch((error) => {
      console.error(error.code, error.message) // eslint-disable-line
      })
  },
  logOut(state, callback) {
    auth.signOut()
      .then(() => {
        state.user = null
        callback()
      })
      .catch((error) => {
        console.error(error.code, error.message) // eslint-disable-line
      })
  },
  uploadImage(state, { image, otherUserID, callback }) {
    const storageRef = storage.ref()
    const newImageRef = storageRef.child(`${state.user.uid}_${otherUserID}-${new Date().valueOf()}.jpg`)

    const docRef = firestore
      .collection('conversations')
      .doc(`${state.user.uid}_${otherUserID}`)

    newImageRef.put(image).then((snapshot) => {
      newImageRef.getDownloadURL().then((url) => {
        docRef.update({
          [new Date().valueOf()]: {
            imageURL: url,
            id: docRef.id
          }
        })
          .catch((error) => {
            console.error(error.code, error.message) // eslint-disable-line
          })
          .finally(() => {
            callback()
          })
      })
        .catch((error) => {
          console.error(error.code, error.message) // eslint-disable-line
        })
    })
  }
}

export const strict = false
