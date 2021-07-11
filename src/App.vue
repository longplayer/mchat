<template>
  <div class="container mx-auto">
    <button @click="loadDataAgain">LoadData</button>
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
    const isDataLoaded = ref(false)
    const loadDataAgain = () => {
      store.dispatch('wp/fetchPagesData').then((r) => {
        console.log('loadDataAgain', r)
      })
    }
    store.dispatch('wp/fetchPagesData').then(() => {
      isDataLoaded.value = true
    })
    return { isDataLoaded, loadDataAgain }
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
