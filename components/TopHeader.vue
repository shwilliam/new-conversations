<template>
  <header>
    <h1>
      <nuxt-link to="/">
        new conversations
      </nuxt-link>
    </h1>
    <nav>
      <ul>
        <li v-if="isLoggedIn">
          <nuxt-link to="/new">
            new
          </nuxt-link>
        </li>
        <li v-if="!isLoggedIn">
          <nuxt-link to="/sign-up">
            sign up
          </nuxt-link>
        </li>
        <li v-if="!isLoggedIn">
          <nuxt-link to="/login">
            login
          </nuxt-link>
        </li>
        <li v-if="isLoggedIn">
          <button
            type="button"
            class="btn-text"
            @click="logOut"
          >
            log out
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TopHeader',
  computed: {
    isLoggedIn() {
      if (!this.$store.state.user) return false
      else return true
    }
  },
  methods: {
    logOut() {
      this.$store.commit(
        'logOut',
        () => this.$router.push({
          path: '/'
        })
      )
    }
  }
}
</script>

<style scoped>
header {
  margin: var(--spacing) 0;
}
header, ul {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  overflow-x: visible;
}
h1 {
  padding: var(--spacingv) 0;
}
li {
  padding: var(--spacingv);
}
</style>
