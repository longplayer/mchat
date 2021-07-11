<template>
  <div class="home">
    <SvgAnimationCat />
    <HelloWorld msg="Vue 3 + Vite + TaliwindCSS" />
  </div>
</template>

<script>
import HelloWorld from '@components/HelloWorld.vue'
import SvgAnimationCat from '@components/SvgAnimationCat.vue'
export default {
  components: {
    HelloWorld,
    SvgAnimationCat,
  },
}
</script>
