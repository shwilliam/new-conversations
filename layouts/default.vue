<template>
  <div id="app">
    <TopHeader />
    <nuxt />
  </div>
</template>

<script>
import TopHeader from '../components/TopHeader.vue'

export default {
  components: {
    TopHeader
  }
}
</script>

<style>
#app {
  margin: var(--spacing);
}
main {
  margin-top: calc(4.5 * var(--spacing));
}
</style>
