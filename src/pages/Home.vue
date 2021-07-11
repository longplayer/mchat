<template>
  <div class="home">
    <h1>{{ appName }}</h1>
    <SvgAnimationCat />
    <a target="_blank" href="https://monsieurchat.fr/">Visit Artist website</a>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import SvgAnimationCat from '@components/SvgAnimationCat.vue'
export default {
  components: {
    SvgAnimationCat,
  },

  setup() {
    const store = useStore()
    const appName = store.state.appName
    console.log(store.state.wp)
    return { appName }
  },
}
</script>
