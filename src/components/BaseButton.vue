<template>
  <component
    :is="tag"
    :class="[buttonClass, variantClass]"
    v-bind="$attrs"
  >
    <slot/>
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
      @apply text-white bg-yellow-900 border-gray-700;
    }

    &:focus-visible {
      @apply text-white bg-yellow-900 border-gray-700;

      &::before {
        outline-color: #fff;
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



/* buttons variations */
/* .btn {
  @apply
  inline-flex items-center justify-between
  p-4 text-center text-gray-900 bg-gray-200
  border-0 rounded-md;
  white-space: nowrap;
  transition: all 0.2s linear;
}
 */
/* sates */
/* .btn:hover {
  @apply text-gray-100 bg-green-700;
  transform: scale(1.02);
  box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.btn:active {
  transform: scale(1);
  box-shadow: none;
}
.btn:focus {
  @apply outline-none;
}
.btn:disabled {
  transform: scale(1);
  box-shadow: none;
} */

/* multiples buttons */
/* .btn + .btn {
  margin-left: 1em;
} */

/* coloration */
/* .btn--green {
  @apply text-gray-100 bg-green-600 hover:bg-green-900;
}

.btn--red {
  @apply text-gray-100 bg-red-600 hover:bg-red-900;
}

.btn--blue {
  @apply text-gray-100 bg-blue-600 hover:bg-blue-900;
}

.btn--gray-100 {
  @apply text-gray-100 bg-gray-100 hover:bg-gray-900;
}

.btn--sneaked {
  @apply p-0 bg-none rounded-none;
  font-weight: inherit;
  background-color: inherit;
  color: inherit;
  font-size: inherit;
  letter-spacing: inherit;
  font-style: inherit;
  text-transform: inherit;
  transition: none;
}

.btn--menu {
  border-radius: 0;
  transition: none;
  color: inherit;
  background-color: inherit;
}

.not--btn {
  padding: inherit;
  height: inherit;
  width: inherit;
  border-radius: inherit;
  background-color: inherit;
  transition: none;
}

.not--btn:hover {
  box-shadow: none;
  background-color: inherit;
}

.btn--menu:hover {
  box-shadow: none;
}

.btn--sneaked:hover {
  background-color: inherit;
  color: inherit;
  box-shadow: none;
  transform: none;
} */

/* modifiers */
/* .btn.-fill-gradient {
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  color: #ffffff;
}

.btn.-icon-right {
  text-align: left;
  padding: 0 20px;
}

.btn.-icon-right > .icon {
  margin-left: 10px;
}

.btn.-icon-left {
  text-align: right;
  padding: 0 20px;
}

.btn.-icon-left > .icon {
  margin-right: 10px;
}

.btn.-icon-center {
  padding: 0 20px;
} */

</style>
