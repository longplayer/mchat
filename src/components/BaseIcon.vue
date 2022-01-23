<template>
    <div class="icon-wrapper">
      <svg class='icon' :width="width" :height="height">
        <use v-bind="{'xlink:href': spritePath + '#' + name}"/>
      </svg>
      <slot></slot>
    </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'Icon',
  props: {
    name: String,
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    }
  },
  setup(){
    // https://vitejs.dev/guide/build.html#public-base-path
    const spritePath = computed(() => `${import.meta.env.BASE_URL}app-sprite.svg`)
    return { spritePath }
  }

}
</script>

<style lang="postcss" scoped>
.icon-wrapper {

  display: inline-flex;
  align-items: center;
  color: inherit;
  font-size: 1rem;
  font-weight: 600;
  
  & .icon {
    stroke: none;
    stroke-width: 0;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: currentColor;
  }
}
</style>
