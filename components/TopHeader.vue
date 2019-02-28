<template>
  <header>
    <h1>
      <nuxt-link to="/">
        new conversations
      </nuxt-link>
    </h1>
    <nav class="z">
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: calc(1.5 * var(--spacing)) 0 var(--spacing) 0;
}
header {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
}
h1 {
  padding: var(--spacingv) var(--spacing);
}
ul {
  white-space: nowrap;
  margin-right: var(--spacing);
}
li {
  padding: var(--spacingv);
}
@media (min-width: 340px) {
  ul {
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
  }
}
</style>
