<template>
  <!-- the comment -->
  <footer>
    <CatLogoColored size="md" />
    <nav class="footer__nav">
      <ul>
        <li v-for="page in pages" :key="page.id">
          <router-link :to="{ name: 'home', hash: '#' + page.slug }" class="animated-underline" :title="page.title.rendered">
            {{ page.title.rendered }}
          </router-link>
        </li>
      </ul>
    </nav>
    <small class="footer__note">
      Vistit <a href="https://monsieurchat.fr/" class="animated-underline" target="_blank" rel="noopener noreferrer" title="Visit original Monsieur Chat's website">Monsieur Chat's website</a> | Website made with 🤍 by <a href="https://github.com/longplayer" class="animated-underline" target="_blank" rel="noopener noreferrer" title="Visit longplayer on Github">longplayer</a>
    </small>
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
  @apply flex flex-wrap relative w-full h-auto md:h-32
    bg-primary border-t-4 border-secondary;

  .cat-container {
    transform: translate(-1rem, -50%);
    @apply absolute top-0 right-0;
    @screen sm {
      left: 0;
      right: inherit;
      transform: translate(1rem, -50%);
    }
  }

  .footer__nav {
    flex: 0 1 auto;
    height: 100%;
    margin: auto auto 0 0;
    @apply p-8 pt-16 md:pt-8 md:pl-36;
    @screen sm {
      flex-grow: 1;
    }

    ul {
      @apply flex flex-wrap w-full h-full
            sm:justify-between sm:content-center;

      li {
        line-height: 1.5rem;
        height: 1.5rem;
        margin: auto 0;
        flex: 1 1 50%;
        @apply inline-block;

        &:nth-child(1) { order: 1; }
        &:nth-child(2) { order: 3; }
        &:nth-child(3) { order: 5; }
        &:nth-child(4) { order: 2; }
        &:nth-child(5) { order: 4; }

        @screen sm {
          text-align: center;
          flex-basis: auto;

          &:nth-child(1) { order: inherit; }
          &:nth-child(2) { order: inherit; }
          &:nth-child(3) { order: inherit; }
          &:nth-child(4) { order: inherit; }
          &:nth-child(5) { order: inherit; }
        }

        a {
          @apply inline-block px-0;
        }
      }
    }
  }

  .footer__note {
    flex: 1 1 100%;
    @apply p-2 text-center text-white bg-secondary;
  }
}
</style>
