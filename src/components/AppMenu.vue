<template>
  <nav
    class="nav__container"
    :class="[containerStatus, stickyStatus]"
    v-page-scroll="scrollStatusChecker"
  >

    <BaseButton 
      class="nav__close" 
      variant="none"
      @click="menuClose"
    >
      <BaseIcon class="mr-2" name="close-line"/>
      <span class="label">Close</span>
    </BaseButton>

    <router-link 
      class="nav__logo w-full"
      :to="{ name: 'home' }">
      <CatLogoLines />
    </router-link>

    <BaseButton 
      @click="menuToggle"
      class="nav__trigger" 
      variant="none"
    >
      <BaseIcon name="menu-line"/>
      <span class="label">Menu</span>
    </BaseButton>

    <div
      class="nav__item" 
      v-for="page in pages" 
      :key="page.id">
      <router-link
        class="nav__anchor"
        @click="doClick"
        :to="{ name: 'home', hash: '#' + page.slug }">
          {{ page.title.rendered }}
      </router-link>
    </div>
    <span class="nav__anim block-corners"></span>
  </nav>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
// import { useRoute } from 'vue-router'
import CatLogoLines from '@components/CatLogoLines.vue'
import bodyOverflow from '@helpers/bodyOverflow.js'

export default {
  components: { CatLogoLines },
  emits: ['selected-section'],
  setup(props, { emit }) {
    const store = useStore()
    // const route = useRoute()
    const pages = computed(() => store.getters['wp/getNavigationData'])
    const containerStatus = computed(() => `nav__container--${ isMenuOpen.value===true ? 'opened' : 'closed' }`)
    const stickyStatus = computed(() => isSticky.value ? 'sticky-active' : '')
    const pageOverflowStatus = computed(() => isMenuOpen.value && window.innerWidth < 768) // avoid window please

    const isMenuOpen = ref(false)
    const isSticky = ref(false)
    const stickyTriggerTop = 90

    function scrollStatusChecker() {
      const scrollTop = document.scrollingElement.scrollTop
      isSticky.value = scrollTop > stickyTriggerTop
    }

    function menuClose() {
      isMenuOpen.value = false
      bodyOverflow(pageOverflowStatus.value)
    }

    function menuToggle() {
      isMenuOpen.value = !isMenuOpen.value
      bodyOverflow(pageOverflowStatus.value)
    }

    function doClick(e) {
      emit('selected-section', {e})
      isMenuOpen.value = false
      setTimeout(()=>{ bodyOverflow(pageOverflowStatus.value) }, 600)
    }

    onMounted(() => {})

    return { 
      pages, 
      scrollStatusChecker, 
      isSticky, 
      isMenuOpen, 
      containerStatus,
      stickyStatus,
      menuToggle,
      menuClose,
      doClick
    }
  },
}
</script>

<style lang="postcss">
.nav__container {
  --base-duration: 250ms;
}
.nav__container {
  z-index: 10;
  padding: 0;
  transform: translate(0, 0);
  transition: transform var(--base-duration) ease-in;
  @apply fixed top-0 right-0 w-auto text-center overflow-hidden;
  @screen md {
    transform: translate(-1rem, 1rem);
    box-shadow: 0px 0px 30px -5px rgb(0 0 0 / 15%);
    max-width: 320px; /* 200px when closed */
    @apply p-1;
  }
  @screen lg {
    transform: translate(-2rem, 2rem);
  }

  .nav__close { z-index: 4; }
  .nav__logo,
  .nav__trigger,
  .nav__item { z-index: 3; }
  .nav__anim { z-index: 1; }

  .nav__logo {
    transform: scale(1);
    @apply relative hidden md:block;

    .cat-container {
      @apply py-4;
      @screen md {
        svg.sm {
          transform: scale(1);
          transform-origin: top;
          transition: transform var(--base-duration) ease-in 650ms;
        }
      }
    }
  }

  .nav__close {
    line-height: 0;
    text-align: center;
    @apply absolute top-0 right-0 bg-primary w-14 h-14 md:w-12 md:h-12;

    .icon-wrapper {
      @apply mx-0;
    }

    .label {
      @apply hidden;
    }
  }

  .nav__trigger {
    height: auto;
    transition: background-color var(--base-duration) ease;
    @apply flex flex-wrap items-center relative bg-white m-auto 
      text-base overflow-hidden;

    .icon-wrapper {
      @apply m-4 relative;
    }

    .label {
      position: absolute;
      transform: translate(3.5rem, 1rem);
      @apply text-base top-0 left-0 lg:text-2xl;

      @screen md {
        @apply m-4;
        position: relative;
        transform: translate(0, 0);
      }
    }

    &::before {
      display: none;
      @screen md {
        content: '';
        z-index: -1;
        width: 80%;
        height: 100%;
        left: 10%;
        transform: scale(0, .5);
        transform-origin: left;
        transition: transform var(--base-duration) ease;
        @apply absolute top-0 block bg-primary mx-auto;
      }
    }

    &:hover,
    &:active,
    &:focus {
      @screen md {
        &::before {
          transform: scale(1, .5);
        }
      }
    }

  }

  .nav__item {
    flex: 1 1 auto;
    @apply relative w-full md:w-auto;

    .nav__anchor {
      /* @apply inline-block w-full py-4; */
      width: 100%;
      padding-top: 1rem;
      padding-bottom: 1rem;
      display: flex;
      flex-wrap: nowrap;
      /* justify-items: center; */
      align-items: center;

      &::after,
      &::before {
        flex: 1 1 auto;
        content: '';
        display: block;
        background-color: #333;
        margin: auto 16px;
        width: auto;
        height: 0.15rem;
        transform: scale(0, 1);
        transition: transform var(--base-duration) ease;
      }

      &::before {
        transform-origin: right;
      }
      &::after {
        transform-origin: left;
      }

      &:hover {
        font-weight: 700;
        &::after,
        &::before {
          transform: scale(1, 1);
        }
      }
    }
  }

  .nav__anim {
    transform: translate(100%, -100%);
    transition: transform var(--base-duration) ease-in;
    @apply block absolute top-0 left-0 w-full h-full bg-white;
    @screen md {
      transition: none;
      transform: translate(0, 0);
    }
  }

  /* navigation status */
  &--closed {

    .nav__trigger {
      @screen md {
        height: 4.25rem;
        transition: transform var(--base-duration) ease-in;
        transform: scale(1);
      }
    }

    .nav__item {
      display: none;
      opacity: 0;
    }

    .nav__close {
      @apply hidden;
    }

    .nav__anim::after,
    .nav__anim::before {
      @apply hidden;
      @screen md { display: inline-block; }
    }
  }

  &--opened {
    @apply flex flex-wrap content-center w-full h-full;
    @screen md {
      @apply h-auto block py-8;
    }

    .nav__logo {
      opacity: 0;
      margin-top: 2.5rem;
      animation: 600ms fromTop var(--base-duration) forwards;
      @apply block;

      @screen md {
        margin-top: 0;
        .cat-container svg.sm {
          transform: scale(1);
        }
      }
      .cat-container svg.sm {}
    }

    .nav__trigger {
      @apply hidden;
      @screen md {
        transition: transform var(--base-duration) ease-in;
        transform: scale(0, 0);
        @apply block;
      }
    }

    .nav__item {
      overflow: hidden;
      opacity: 1;
      transform: scale(0, 0);
      animation: 600ms fadeIn 360ms forwards;
    }

    .nav__anim {
      transform: translate(0%, 0%);
      &::after,
      &::before {}
    }
  }

  &.sticky-active {
    @screen md{}
    .nav__logo {}
  }
}

/* utility class */

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
    transform: scale(0.5, 1);
  }
  100% {
    opacity: 1;
    height: auto;
    transform: scale(1, 1);
  }
}

@keyframes fromTop {
  0% {
    opacity: 0;
    display: block;
    transform: translate(0, -100%) scale(2);
  }
  30% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
}
</style>
