import { auth } from '@/services/firebase'

export const state = () => ({
  user: null
})

export const mutations = {
  signUp(state, { email, password, callback }) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        state.user = user
        callback()
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
  }
}

export const strict = false
