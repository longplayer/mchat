<template>
  <div class="container mx-auto">
    <template v-if="isDataLoaded">
      <RouterView />
    </template>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const isDataLoaded = ref(true)
    // store.dispatch('wp/fetchPagesData').then(() => {
    //   isDataLoaded.value = true
    // })
    return { isDataLoaded }
  },
}
</script>

<style lang="postcss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
