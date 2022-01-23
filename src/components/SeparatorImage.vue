<template>
  <div :class="[variantClass, placementClass]">

    <template v-if="placement === 'fullwidth'">
      <div class="rationer">
        <figure class="rationer-inside">
          <img
            class="separator__image"
            :src="image"
            alt="">
          </figure>
      </div>
    </template>
    <template v-if="placement === 'diagonale'">
      <div class="separator__inner">
        <img class="separator__image" :src="image" alt="Section separator">
      </div>
    </template>
  </div>
</template>

<script>
import { computed } from 'vue'
const allowedVariants = ['primary', 'secondary', 'none']
const allowedPlacement = ['fullwidth', 'diagonale']
export default {
  props: {
    image: {
      type: String,
      default: 'http://www.placehold.it/512x512'
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => allowedVariants.includes(value)
    },
    placement: {
      type: String,
      default: 'fullwidth',
      validator: (value) => allowedPlacement.includes(value)
    }
  },
  setup (props) {
    const separatorClass = 'separator__container';
    const placementClass = computed(() => {
      if (props.variant === 'none') return ''
      else return `separator__${props.placement}`
    })
    const variantClass = computed(() => {
      if (props.variant === 'none') return ''
      else return `${separatorClass} separator__${props.variant}`
    })

    return { variantClass, placementClass }
  }
}
</script>

<style lang="postcss">
.separator__container {

  @apply w-full overflow-hidden;
  border-width: 1.5rem;
  @screen lg { border-width: 2.25rem; }
  @screen xl { border-width: 3rem; }

  /* image cover */
  .separator__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
  }

  /* theme colors */
  &.separator__primary { @apply border-primary; }
  &.separator__secondary { @apply border-secondary; }

  /* specific rules */
  &.separator__fullwidth {
    border-left-width: 0;
    border-right-width: 0;
  }

  &.separator__diagonale {
    position: relative;
    aspect-ratio: 1 / 1;
    height: auto;
    margin: 0 auto;
    transform: rotate(45deg);
    width: 60%;
    @screen lg { width: 50%; }
    @screen xl { width: 40%; }

    .separator__inner {
      width: 100%;
      height: 100%;
      transform: rotate(-45deg) scale(1.5);
    }
  }
}
</style>
