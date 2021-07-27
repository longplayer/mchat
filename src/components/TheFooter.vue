<template>
  <!-- the comment -->
  <footer>
    <CatLogoColored size="md" />
    <nav class="footer-navigation">
      <ul>
        <li v-for="page in pages" :key="page.id">
          <router-link :to="page.slug">
            {{ page.title.rendered }}
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="footer-legal">
      <p><strong>Copyright</strong></p>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import CatLogoColored from './CatLogoColored.vue'
export default {
  components: { CatLogoColored },
  setup () {
    const store = useStore()
    const pages = computed(() => store.state.wp.navigation)
    return { pages }
  }
}
</script>

<style lang="postcss" scoped>
footer {
  @apply relative bottom-0 flex w-full h-32 p-8 pr-36 bg-primary border-t-4 border-secondary;

  & li {
    @apply inline-block;
  }

  & a {
    @apply inline-block px-4;

    &:hover {
      @apply font-bold underline;
    }
  }

  & .cat-container {
    @apply absolute top-0 right-0;
    transform: translate(-1rem, -50%)
  }

  & .footer-navigation,
  & .footer-legal {
    @apply flex-auto m-auto;
  }

  & .footer-legal {
    @apply uppercase text-right;
  }
}
</style>
