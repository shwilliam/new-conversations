<template>
  <main>
    <h2>new</h2>
    <form @submit.prevent="uploadFile">
      <label>Image:
        <input
          id="image-upload"
          type="file"
          name="image"
          accept="image/jpeg,image/png"
          required
          @change="selectFile"
        >
      </label>
      <label>To:
        <select v-model="otherUserID" name="otherUserID" required>
          <option disabled value="">Select a user</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.nickname }}
          </option>
        </select>
      </label>
      <button type="submit">
        upload
      </button>
    </form>
    <p v-if="uploading">
      uploading...
    </p>
  </main>
</template>

<script>
import { firestore } from '@/services/firebase'

export default {
  name: 'New',
  data() {
    return {
      imageInput: null,
      uploading: false,
      otherUserID: null,
      users: null
    }
  },
  computed: {
    filesize() { // in MB
      if (!this.imageInput) return
      return ((this.imageInput.size / 1024) / 1024).toFixed(4)
    }
  },
  async asyncData({ store }) {
    const users = []
    await firestore
      .collection('users')
      .onSnapshot((snapshot) => {
        snapshot.forEach((user) => {
          const { id, nickname } = user.data()

          if (id !== store.state.user.uid) users.push({ id, nickname })
        })
      })
    return { users }
  },
  mounted() {
    this.imageInputEl = document.getElementById('image-upload')
  },
  methods: {
    selectFile() {
      this.imageInput = this.imageInputEl.files[0]
    },
    uploadFile() {
      if (this.filesize > 1) {
        alert('file is too big!')
      } else {
        this.uploading = true
        this.$store.commit('uploadImage', {
          image: this.imageInput,
          otherUserID: this.otherUserID,
          callback: () => this.$router.push({
            path: '/'
          })
        })
      }
    }
  }
}
</script>
