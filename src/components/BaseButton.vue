<template>
  <component
    :is="tag"
    :class="[buttonClass, variantClass]"
    v-bind="$attrs"
  >
    <slot name="default" />
  </component>
</template>

<script>
import { computed } from 'vue'
const availableTags = ['button', 'a', 'router-link']
const availableVariants = ['primary', 'secondary', 'none']
export default {
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String
    },
    tag: {
      type: String,
      default: 'button',
      validator: (value) => availableTags.includes(value)
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => availableVariants.includes(value)
    }
  },
  setup (props) {
    const variantClass = computed(() => {
      if (props.variant === 'none') return ''
      else return `btn btn__${props.variant}`
    })
    return { variantClass }
  }
}
</script>

<style lang="postcss" scoped>
.btn {
  @apply h-16 px-12 text-base border relative;
  @apply md:h-20 md:px-14 md:text-2xl;
  @apply xl:h-24 xl:px-16 xl:text-5xl;

  outline: none;
  transition: 220ms all ease-in-out;

  border-radius: .4rem; 
  @screen md { border-radius: .5rem; }
  @screen xl { border-radius: .6rem; }

  /* a11y friendly focus state */
  &:focus-visible {
    &::before {
      @apply block absolute m-auto top-1/2 left-1/2;
      content: '';
      transform: translate(-50%, -50%);
      width: 90%;
      height: 70%;

      outline: .2rem dashed white;
      @screen md { outline-width: .3rem; }
      @screen xl { outline-width: .4rem; }
    }
  }

  /* buttons variation */
  &.btn__primary {
    @apply bg-primary border-yellow-900;

    &:hover,
    &:active {
      @apply text-yellow-400 bg-gray-700;
    }

    &:focus-visible {
      @apply text-yellow-400 bg-gray-700;
      &::before {
        outline-color: currentColor;
      }
    }
  }

  &.btn__secondary {
    @apply bg-white border-gray-700;

    &:hover {
      @apply text-gray-700 bg-yellow-50 border-yellow-500;
    }

    &:focus-visible {
      @apply text-gray-700 bg-yellow-50 border-yellow-500;

      &::before {
        outline-color: #333;
      }
    }
  }
}
</style>
