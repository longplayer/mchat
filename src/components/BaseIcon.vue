<template>
    <div class="icon-wrapper">
      <svg class='icon' :width="width" :height="height">
        <use v-bind="{'xlink:href':'/app-sprite.svg#' + name}"/>
      </svg>
      <slot></slot>
    </div>
</template>

<script>
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
