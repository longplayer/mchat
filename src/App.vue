<template>
  <AppMenu />
  <main class="">
    <RouterView v-show="isDataLoaded" />
  </main>
  <TheFooter />
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import AppMenu from '@components/AppMenu.vue'
import TheFooter from '@components/TheFooter.vue'

export default {
  components: { AppMenu, TheFooter },
  setup() {
    const store = useStore()
    const isDataLoaded = ref(false)
    const pages = ref([])

    store.dispatch('wp/fetchPagesData').then((pagesData) => {
      // Now <router-view> can be mounted
      isDataLoaded.value = true

      // keep only allowed pages
      pages.value = store.state.wp.allowedSlugs
        .map(slug => pagesData
          .filter(page => page.slug === slug)[0])

      // Save to state.wp.navigation
      store.dispatch('wp/saveNavigation', pages.value)
      // console.log(store.state.wp.navigation)
    })

    // fetch other data
    store.dispatch('wp/fetchCategoriesData').then((categoriesData) => {
      categoriesData.forEach(category => {
        // console.log(category.name, category.id, category)
      })
    })

    // store.dispatch('wp/fetchPostsData').then(() => {
    //   console.log(store.state.wp.posts)
    // })
    // store.dispatch('wp/fetchMediaData').then(() => {
    //   console.log(store.state.wp.media)
    //   console.log(store.state.wp)
    // })

    return { isDataLoaded, pages }
  },
}
</script>

<style lang="postcss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* min-height: 100vh; */
  @apply w-full h-full top-0 left-0 p-0 m-0 relative;
}
</style>
