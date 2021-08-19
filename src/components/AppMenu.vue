<template>
  <nav v-page-scroll="detectScroll" class="main-navigation">
    <router-link class="w-full" :to="{ name: 'home' }">
      <CatLogoLines />
    </router-link>

    <BaseButton class="flex flex-wrap items-center mx-auto mb-6 text-base" type="none">
      <BaseIcon class="mr-2" name="menu-line"/>
      <span class="label">Menu</span>
    </BaseButton>

    <div class="menu-item" v-for="page in pages" :key="page.id">
      <!-- <router-link :to="`#${page.slug}`"> -->
      <router-link :to="{ name: 'home', hash: '#' + page.slug }">
        {{ page.title.rendered }}
      </router-link>
    </div>

    <div class="menu-item">
      <router-link :to="{name: 'playground'}">
        test
      </router-link>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import CatLogoLines from '@components/CatLogoLines.vue'

export default {
  components: { CatLogoLines },
    setup() {
      const store = useStore()
      const pages = computed(() => store.getters['wp/getNavigationData'])
      function detectScroll() {
        console.log('scroll listener activated')
      }
      return { pages, detectScroll }
    },
}
</script>

<style lang="postcss" scoped>
nav {
  /* display: none; */

  @apply fixed w-full bg-white text-center;
  z-index: 10;
  transform: translate(2rem, 2rem);
  transition: all 360ms ease-in-out;

  @screen md {
    max-width: 320px; /* 200px when closed */
  }
  @screen lg {
    transform: translate(4rem, 4rem);
  }

  & a {
    @apply inline-block w-full py-4;
  }

  & .label {
    @apply text-base lg:text-2xl;
  }

  & .menu-item {
  }

  &.main-navigation {

    &::before,
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 2rem;
      height: 2rem;
    }

    &::before {
      top: 0;
      left: 0;
      border-top: .25rem solid var(--color-primary);
      border-left: .25rem solid var(--color-primary);
    }

    &::after {
      bottom: 0;
      right: 0;
      border-bottom: .25rem solid var(--color-primary);
      border-right: .25rem solid var(--color-primary);
      
    }

  }

  & .cat-container {
    @apply py-12;
  }

}
</style>
