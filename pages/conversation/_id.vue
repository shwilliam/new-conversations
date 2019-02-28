<template>
  <main>
    <ul>
      <li v-for="image in images" :key="image.imageURL">
        <img :src="image.imageURL" alt="">
        <div>
          <p>{{ image.timestamp | formatTimestamp }}</p>
          <p>{{ users[image.author] | initials }}</p>
        </div>
      </li>
    </ul>
  </main>
</template>

<script>
import { firestore } from '@/services/firebase'

export default {
  name: 'Conversation',
  filters: {
    formatTimestamp(timestamp) {
      const date = new Date(parseInt(timestamp))
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      return `${day}/${month}/${year}`
    },
    initials(name) {
      return name.split(' ').map(name => name[0].toUpperCase()).join('.')
    }
  },
  data() {
    return {
      conversation: null
    }
  },
  validate({ params }) {
    const [id1, id2] = params.id.split('_')
    return (/(([A-Z]|[a-z]|[0-9]){28})/.test(id1) && /(([A-Z]|[a-z]|[0-9]){28})/.test(id2))
  },
  computed: {
    images() {
      return Object.keys(this.conversation).map(timestamp => ({ timestamp, ...this.conversation[timestamp] })).sort((a, b) => {
        return a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0
      })
    }
  },
  async asyncData({ params }) {
    const getConversation = new Promise((resolve, reject) => {
      firestore
        .collection('conversations')
        .doc(params.id)
        .get()
        .then((snapshot) => {
          resolve(snapshot.data())
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

    const conversation = await getConversation
    const users = await getUsers

    return { conversation, users }
  }
}
</script>

<style scoped>
ul {
  display: -webkit-flex;
  display: flex;
}
li {
  margin-left: var(--spacingv);
}
img {
  height: 300px;
}
</style>
