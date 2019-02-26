<template>
  <main>
    <h2>login</h2>
    <form @submit.prevent="logIn">
      <label>Email:
        <input v-model="emailInput" type="email" placeholder="" name="email" required>
      </label>
      <label>Password:
        <input v-model="passwordInput" type="password" placeholder="" name="password" required>
      </label>
      <button type="submit">
        log in
      </button>
    </form>
  </main>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      emailInput: '',
      passwordInput: ''
    }
  },
  methods: {
    logIn() {
      this.$store.commit('logIn', {
        email: this.emailInput,
        password: this.passwordInput,
        callback: () => this.$router.push({
          path: '/'
        })
      })
    }
  }
}
</script>
