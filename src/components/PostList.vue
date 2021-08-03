<template>
  <h1 v-if="title">
    {{ title }}
  </h1>
  <ul>
    <template v-if="dataSource.length">
      <li v-for="item in dataSource" :key="item.id">
        <h2>{{ item.title.rendered }}</h2>
        <div class="item-content" v-html="item.excerpt.rendered"></div>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props:{
    dataSource: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
    }
  }
}
</script>

<style lang="postcss">
li {

  h2 {
    @apply mb-6 pb-6 border-b border-gray-600;
  }

  p {
    @apply truncate;
  }
}
</style>
