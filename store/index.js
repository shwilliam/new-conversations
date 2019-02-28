import { auth, firestore, storage } from '@/services/firebase'

export const state = () => ({
  user: null
})

export const mutations = {
  signUp(state, { name, email, password, callback }) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        state.user = user
        firestore
          .collection('users')
          .doc(user.uid)
          .set({
            id: user.uid,
            email,
            name
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
    const userIDs = [state.user.uid, otherUserID].sort()
    const conversationID = `${userIDs[0]}_${userIDs[1]}`
    const timestamp = new Date().valueOf()
    const newImageRef = storageRef.child(`${conversationID}-${timestamp}.jpg`)

    const docRef = firestore
      .collection('conversations')
      .doc(conversationID)

    newImageRef.put(image).then((snapshot) => {
      newImageRef.getDownloadURL().then((url) => {
        docRef.update({
          [timestamp]: {
            imageURL: url,
            author: state.user.uid,
            users: [state.user.uid, otherUserID],
            conversationID
          }
        })
          .catch(() => {
            // document likely does not exist
            docRef.set({
              [timestamp]: {
                imageURL: url,
                author: state.user.uid,
                users: [state.user.uid, otherUserID],
                conversationID
              }
            })
              .catch((error) => {
              console.error(error.code, error.message) // eslint-disable-line
              })
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
