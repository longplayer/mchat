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
  @apply flex relative bg-primary border-t-4 border-secondary 
    bottom-0 p-8 pt-16 md:pt-8 md:pl-36 w-full h-auto md:h-32 ;

  & li {
    @apply inline-block;
  }

  & a {
    @apply inline-block px-0 sm:px-4;

    &:hover {
      @apply font-bold underline;
    }
  }

  & .cat-container {
    transform: translate(-1rem, -50%);
    @apply absolute top-0 right-0;
    @screen sm {
      left: 0;
      right: inherit;
      transform: translate(1rem, -50%);
    }
  }

  & .footer-navigation {
    columns: 2;
    flex: 0 1 0%;
    margin: auto auto auto 0;
    @screen sm {
      columns: unset;
      flex: 1 1 auto;
      margin: auto;

    }
  }

  & .footer-legal {
    position: absolute;
    bottom: .25rem;
    right: .25rem;
    @screen sm {
      right: 1rem;
      bottom: 2rem;
    }
    @screen md {
      flex: 0 1 auto;
      margin: auto;
      position: relative;
      bottom: inherit;
      right: inherit;
    }
    /* @apply text-right; */
  }
}
</style>
