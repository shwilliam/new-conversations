<template>
  <main>
    <ul>
      <li v-for="conversation in conversations" :key="Object.keys(conversation)[0]">
        <nuxt-link :to="`/conversation/${Object.keys(conversation)[0]}`">
          {{ formatConversationLabel(conversation) }}
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script>
import { firestore } from '@/services/firebase'

export default {
  name: 'Home',
  data() {
    return {
      conversations: null,
      users: null
    }
  },
  async asyncData() {
    const getConversations = new Promise((resolve, reject) => {
      const conversations = []
      firestore
        .collection('conversations')
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            conversations.push({ [doc.id]: doc.data() })
          })
          resolve(conversations)
        })
        .catch((error) => {
          reject(new Error(error))
        })
    })

    const getUsers = new Promise((resolve, reject) => {
      const users = {}
      firestore
        .collection('users')
        .onSnapshot((snapshot) => {
          snapshot.forEach((user) => {
            const { id, name } = user.data()
            users[id] = name
          })
          resolve(users)
        })
    })

    const conversations = await getConversations
    const users = await getUsers

    return { conversations, users }
  },
  methods: {
    formatConversationLabel(conversation) {
      return Object.keys(conversation)[0].split('_').map(id => this.users[id]).join(' and ')
    }
  }
}
</script>

<style scoped>
li {
  padding: var(--spacingv) 0;
}
</style>
