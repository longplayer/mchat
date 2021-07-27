<template>
  <div
    :class="[variantClass, placementClass]">
    <div class="rationer">
      <figure class="rationer-inside">
        <img
          :src="image"
          alt="">
        </figure>
    </div>
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
    const separatorClass = 'separator__image';
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
  .separator__image {
    border-width: 1rem 0;

    @screen lg { border-width: 2rem 0; }
    @screen xl { border-width: 3rem 0; }

    &.separator__primary {
      @apply border-primary;
    }
    &.separator__secondary {
      @apply border-secondary;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
