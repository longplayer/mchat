<template>
  <AppMenu />
  <main class="">
    <template v-if="isDataLoaded">
      <RouterView />
    </template>
  </main>
  <TheFooter />
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import AppMenu from '@components/AppMenu.vue'
import TheFooter from '@components/TheFooter.vue'

export default {
  components: { AppMenu, TheFooter },
  setup() {
    const store = useStore()
    const isDataLoaded = ref(false)
    const pages = ref([])
    store.dispatch('wp/fetchPagesData').then(() => {
      // Now <router-view> can be mounted
      isDataLoaded.value = true

      // keep only allowed pages
      pages.value = store.state.wp.allowedSlugs
        .map(slug => store.state.wp.pages
          .filter(page => page.slug === slug)[0])

      // Save to state.wp.navigation
      store.dispatch('wp/saveNavigation', pages.value)
    })

    // fetch other data
    store.dispatch('wp/fetchCategoriesData')
    store.dispatch('wp/fetchPostsData')
    store.dispatch('wp/fetchMediaData')

    return { isDataLoaded }
  },
}
</script>

<style lang="postcss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @apply w-full h-full top-0 left-0 p-0 m-0 relative;
}
</style>
