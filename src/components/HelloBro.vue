<template>
  <div ref="box" :class="['container', cssClass]">
    <p class="message">
      {{ message }}
    </p>
  </div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUpdate } from 'vue'

export default {
  props: {
    message: {
      type: String,
      default: 'Hello Bro!!!'
    },
    colorType: {
      type: String,
      default: 'primary'
    },
  },
  setup(props) {
    const box = ref(null)
    const cssClass = computed(() => 'container--' + props.colorType)
    return { box, cssClass }
  },
}
</script>

<style scoped lang="postcss">
.container--primary {
  /* background-color: var(--color-primary); */
  @apply bg-gray-900;
}
.container--secondary {
  background-color: var(--color-secondary);
}

.container {
  padding: 2rem;

  p {
    color: white;
    font-weight: 900;
    font-size: 24px;
  }
}

</style>
