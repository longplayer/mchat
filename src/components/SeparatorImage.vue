<template>
  <div :class="[variantClass, placementClass]">

    <template v-if="placement === 'fullwidth'">
      <div class="rationer">
        <figure class="rationer-inside">
          <img
            :src="image"
            alt="">
          </figure>
      </div>
    </template>
    <template v-if="placement === 'diagonale'">
      <div class="shape-wrapper">
        <div id="rhombus">
          <div class="shape"></div>
          <div class="content">
            <img :src="image">
          </div>
        </div>
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

  /* thematic rules */
  &.separator__primary.separator__fullwidth {
    @apply border-primary;
    border-width: 1rem 0;

    @screen lg { border-width: 2rem 0; }
    @screen xl { border-width: 3rem 0; }
  }
  &.separator__secondary.separator__fullwidth {
    @apply border-secondary;
  }

  &.separator__primary.separator__diagonale {
    .shape {
      @apply text-primary;
    }
  }
  &.separator__secondary.separator__diagonale {
    .shape {
      @apply text-secondary;
    }
  }

  /* common rules */
  &.separator__fullwidth {
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &.separator__diagonale {

    /* @apply bg-green-100; */

    .shape-wrapper {

      box-sizing: border-box;
      width: 80vh;
      padding: 0;
      background-color: inherit;
      position: relative;
      margin: 10vh auto;
    
      #rhombus {

        width: 100%;
        background-color: inherit;
        
        .shape {
          width: 0;
          height: 0;
          border: 40vh solid transparent;
          border-bottom-color: currentColor;
          position: relative;
          top: -40vh;
          
          &:after {
            content: "";
            position: absolute;
            left: -40vh;
            top: 40vh;
            width: 0;
            height: 0;
            border: 40vh solid transparent;
            border-top-color: currentColor;
          }
        }
        
        .content {
          display: block;
          position: absolute;
          overflow: hidden;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          
          img {
            position: relative;
            width: 80%;
            height: 80%;
            transform: translate(12.5%, 12.5%);
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          }
        }
      }
    }
  }
}
</style>
