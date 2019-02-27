<template>
  <div>
    <h2>sign up</h2>
    <form @submit.prevent="signUp">
      <label>Nickname:
        <input v-model="nicknameInput" type="text" placeholder="" name="nickname" required>
      </label>
      <label>Email:
        <input v-model="emailInput" type="email" placeholder="" name="email" required>
      </label>
      <label>Password:
        <input v-model="passwordInput" type="password" placeholder="" name="password" required>
      </label>
      <label>Confirm password:
        <input v-model="passwordConfirmInput" type="password" placeholder="" name="passwordConfirm" required>
      </label>
      <button type="submit">
        sign up
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      nicknameInput: '',
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
          nickname: this.nicknameInput,
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
