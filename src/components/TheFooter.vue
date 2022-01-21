<template>
  <!-- the comment -->
  <footer>
    <CatLogoColored size="md" />
    <nav class="footer-navigation">
      <ul>
        <li v-for="page in pages" :key="page.id">
          <router-link :to="{ name: 'home', hash: '#' + page.slug }" class="animated-underline">
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
    /* columns: 2; */
    flex: 1 1 100%;
    height: 100%;
    margin: auto;

    & ul {
      columns: 2;
      @apply w-full h-full;
      @screen sm {
        columns: unset;
        margin-right: 40%;
        @apply flex flex-wrap justify-between content-center;
      }
    }

    & li {
      line-height: 1.5rem;
      height: 1.5rem;
      margin: auto 0;
      flex: 1 1 50%;
      @apply inline-block;
      @screen sm {
        flex: 1 1 auto;
      }
    }

    & a {
      @apply inline-block px-0;
    }

  }

  & .footer-legal {
    display: none;
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
  }
}
</style>
