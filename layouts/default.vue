<template>
  <div id="app">
    <TopHeader />
    <nuxt />
    <BottomFooter />
  </div>
</template>

<script>
import TopHeader from '../components/TopHeader.vue'
import BottomFooter from '../components/BottomFooter.vue'

export default {
  components: {
    TopHeader,
    BottomFooter
  }
}
</script>

<style>
#App {
  margin: var(--spacing);
}
</style>
