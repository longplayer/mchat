<template>
  <div class="container mx-auto">
    <AppMenu />
    <template v-if="isDataLoaded">
      <RouterView />
    </template>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import AppMenu from '@components/AppMenu.vue'

export default {
  components: { AppMenu },
  setup() {
    const store = useStore()
    const isDataLoaded = ref(false)
    store.dispatch('wp/fetchPagesData').then(() => {
      isDataLoaded.value = true
      // fetch other data
      store.dispatch('wp/fetchCategoriesData')
      store.dispatch('wp/fetchPostsData')
      store.dispatch('wp/fetchMediaData')
    })
    
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
