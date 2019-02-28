<template>
  <main>
    <form @submit.prevent="signUp">
      <label>
        full name
        <input v-model="nameInput" type="text" placeholder="" name="name" required>
      </label>
      <label>
        e-mail
        <input v-model="emailInput" type="email" placeholder="" name="email" required>
      </label>
      <label>
        password
        <input v-model="passwordInput" type="password" placeholder="" name="password" required>
      </label>
      <label>
        confirm password
        <input v-model="passwordConfirmInput" type="password" placeholder="" name="passwordConfirm" required>
      </label>
      <button type="submit">
        sign up
      </button>
    </form>
  </main>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      nameInput: '',
      emailInput: '',
      passwordInput: '',
      passwordConfirmInput: ''
    }
  },
  computed: {
    passwordsMatch() {
      return this.passwordInput.length && this.passwordInput === this.passwordConfirmInput
    }
  },
  methods: {
    signUp() {
      if (this.passwordsMatch) {
        this.$store.commit('signUp', {
          name: this.nameInput,
          email: this.emailInput,
          password: this.passwordInput,
          callback: () => this.$router.push({
            path: '/'
          })
        })
      } else alert('passwords don\'t match')
    }
  }
}
</script>
