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
      ref="introElement"
      v-html="introData"
      class="section--inner text-center"
    ></div>
  </section>
  <section class="separator">
    <SeparatorImage
      :image="separatorImages[1]"
      variant="primary"
    />
  </section>
  <section class="news container">
    <div class="section--inner">
      <h1>Actus</h1>
      <ul>
        <template v-if="newsPageData.length">
          <li v-for="post in newsPageData" :key="post.id">
            <h2>{{ post.title.rendered }}</h2>
            <div class="item-content" v-html="post.excerpt.rendered"></div>
          </li>
        </template>
      </ul>
    </div>
  </section>
  <section class="separator">
    <SeparatorImage
      :image="separatorImages[2]"
      variant="secondary"
    />
  </section>
  <section class="events container">
    <div class="section--inner">
      <h1>Expos</h1>
      <ul>
        <template v-if="eventPageData.length">
          <li v-for="post in eventPageData" :key="post.id">
            {{ post.title.rendered }}
          </li>
        </template>
      </ul>
    </div>
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
import he from 'he'
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
    const isIntroDataCleaned = ref(false)
    const introData = computed(() => store.state.wp.navigation[0].content.rendered)
    const introElement = ref(null) // dom element
    const newsPageData = ref([])
    const eventPageData = ref([])
    const separatorImages = ref([
      // not found with rest api
      'https://monsieurchat.fr/wp-content/themes/mrchat/img/photo002.jpg',
      'https://monsieurchat.fr/wp-content/themes/mrchat/img/photo003.jpg',
      'https://monsieurchat.fr/wp-content/themes/mrchat/img/photo004.jpg',
    ])

    store.dispatch('wp/fetchPostsByCategory', 16).then((data) => {
      newsPageData.value = stringSanitizer(data, 'title', dataLimit)
    })
    store.dispatch('wp/fetchPostsByCategory', 17).then((data) => {
      eventPageData.value = stringSanitizer(data, 'title', dataLimit)
    })

    onBeforeUpdate(() => {
      if (!isIntroDataCleaned.value) {
        isIntroDataCleaned.value = true // run only once
        removeUnwantedChildnodes(2) // remove all elements after this index
      }
    })

    function stringSanitizer (array, property, limit) {
      return array.slice(0, limit).map(item => {
        item[property].rendered = he.decode(item[property].rendered)
        return item
      })
    }

    function removeUnwantedChildnodes(indexLimit) {
      const length = introElement.value.children.length - 1
      for (let i = 0; i < length; i++) {
        if (i >= indexLimit) introElement.value.children[introElement.value.children.length - 1].remove()
      }
    }

    return {
      separatorImages,
      introData,
      introElement,
      newsPageData,
      eventPageData
    }
  },
}
</script> 

<style lang="postcss">
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

  /* new global (move to index.css) */
  section.container {

    @apply flex flex-wrap justify-center items-center py-16 px-8;
    
    .section--inner {
      @apply flex-auto m-auto max-w-full;

      h1 {
        @apply mb-16 lg:mb-32;
      }

      p {
        @apply mb-4
      }

      li {
        @apply mb-12;
      }
    }

    li {

      h2 {
        @apply mb-6 pb-6 border-b border-gray-600;
      }

      p {
        @apply truncate;
      }
    }
  }

  .container.intro {

    p:last-child {
      @apply font-bold mb-16;
    }
  }

  .news {

    h1, ul {
      flex: 1 1 100%;
      width: 100%;
    }

  }


</style>
