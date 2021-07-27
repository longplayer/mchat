<template>
  <section class="hero">
    <div class="hero-item">
      <CatLogoAnimated size="xxl"/>
      <BaseButton variant="secondary">
        Bienvenue
      </BaseButton>
    </div>
  </section>
  <section class="intro container">
    <div
      ref="introBlock"
      v-html="introData"
      class="text-center"
    ></div>
  </section>
  <section class="separator">
    <SeparatorImage
      :image="separatorImages[1]"
      variant="primary"
    />
  </section>
  <section class="news container">
    <h1>Actus</h1>
    <ul>
      <template v-if="newsPageData.length">
        <li v-for="post in newsPageData" :key="post.id">
          {{ post.title.rendered }}
        </li>
      </template>
    </ul>
  </section>
  <section class="separator">
    <SeparatorImage
      :image="separatorImages[2]"
      variant="secondary"
    />
  </section>
  <section class="events container">
    <h1>Expos</h1>
    <ul>
      <template v-if="eventPageData.length">
        <li v-for="post in eventPageData" :key="post.id">
          {{ post.title.rendered }}
        </li>
      </template>
    </ul>
  </section>
  <section class="separator">
    <SeparatorImage
      :image="separatorImages[0]"
      variant="primary"
    />
  </section>
  <br>
</template>

<script>
import { computed, ref, onBeforeUpdate } from 'vue'
import { useStore } from 'vuex'
import CatLogoAnimated from '@components/CatLogoAnimated.vue'
import SeparatorImage from '@components/SeparatorImage.vue'

export default {
  components: {
    CatLogoAnimated,
    SeparatorImage,
  },

  setup() {
    const store = useStore()
    const dataLimit = 5
    const introData = computed(() => store.state.wp.navigation[0].content.rendered)
    const introBlock = ref(null)
    const newsPageData = ref([])
    const eventPageData = ref([])
    const separatorImages = ref([
      // not found with rest api
      'https://monsieurchat.fr/wp-content/themes/mrchat/img/photo002.jpg',
      'https://monsieurchat.fr/wp-content/themes/mrchat/img/photo003.jpg',
      'https://monsieurchat.fr/wp-content/themes/mrchat/img/photo004.jpg',
    ])

    store.dispatch('wp/fetchPostsByCategory', 16).then((r) => {
      console.log(r)
      newsPageData.value = r.slice(0, dataLimit)
    })
    store.dispatch('wp/fetchPostsByCategory', 17).then((r) => {
      console.log(r)
      eventPageData.value = r.slice(0, dataLimit)
    })

    onBeforeUpdate(() => {
      // remove unwanted content from html string returned by content.rendered
      const initialLength = introBlock.value.children.length - 1
      for (let i = 0; i < initialLength; i++) {
        if (i >= 2) introBlock.value.children[introBlock.value.children.length - 1].remove()
      }
    })

    return {
      separatorImages,
      introData,
      introBlock,
      newsPageData,
      eventPageData
    }
  },
}
</script> 

<style lang="postcss" scoped>
  .hero {
    @apply w-full h-screen flex flex-wrap items-center justify-center;

    & .hero-item {

      @apply text-center;

      & .cat-container {
        @apply mb-0;
        flex: 1 1 100%;
      }

      & .btn {
        @apply mx-auto mt-8 lg:mt-16 xl:mt-24;
      }
    }
  }

  .separator {
    @apply w-full mx-auto;
    max-width: 1280px;
  }


</style>
