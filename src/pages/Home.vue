<template>
  <section class="hero">
    <div class="hero-item">
      <CatLogoAnimated size="xxl"/>
      <BaseButton variant="secondary">
        Bienvenue
      </BaseButton>
    </div>
  </section>
  <section id="accueil" class="intro container">
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
  <section id="actus" class="news container">
    <div class="section--inner">
      <PostList
        title="Actus"
        :dataSource="newsPageData"
      />
    </div>
  </section>
  <section class="separator">
    <SeparatorImage
      :image="separatorImages[2]"
      variant="secondary"
      placement="diagonale"
    />
  </section>
  <section id="expos" class="events container">
    <div class="section--inner">
      <PostList
        title="Expos"
        :dataSource="eventPageData"
      />
    </div>
  </section>
  <section class="separator">
    <SeparatorImage
      :image="separatorImages[0]"
      variant="primary"
    />  
  </section>
  <section id="wall" class="wall container">
    <div id="wall-grid" class="section--inner grid__container">
      
      <div 
        v-for="(image, index) in wallPageData"
        :key="index"
        class="grid__item"
        tabindex="0"
      >
        <figure class="grid__fig">
          <img
            v-pswp="image.src"
            :src="image.src"
            :alt="image.alt"
            class="grid__image"
          >
          <caption class="grid__caption">{{ image.alt }}</caption>
        </figure>
      </div>
    </div>
  </section>
  <section id="contact" class="contact container">
    <div class="section--inner">
      <h1>Contact</h1>
    </div>
  </section>
</template>

<script>
import { computed, ref, onBeforeUpdate, onMounted } from 'vue'
import { useStore } from 'vuex'
import he from 'he'
import CatLogoAnimated from '@components/CatLogoAnimated.vue'
import SeparatorImage from '@components/SeparatorImage.vue'
import PostList from '@components/PostList.vue'

export default {
  components: {
    CatLogoAnimated,
    SeparatorImage,
    PostList
  },

  setup() {
    const store = useStore()
    const dataLimit = 5
    const isIntroDataCleaned = ref(false)
    const introData = computed(() => store.state.wp.navigation[0].content.rendered)
    const wallData = computed(() => store.state.wp.navigation.filter(page => page.slug === 'wall')[0].content.rendered)
    const wallPageData = ref(null)
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

    onMounted(() => {
      wallPageData.value = searchTagOnString(wallData.value)
    })

    function searchTagOnString(string) {
      const imgPattern = /<img [^>]*src="[^"]*"[^>]*>/gm
      const hrefPattern = /<img.*?src="(.*?)"/ // href & alt patterns could be improved
      const altPattern = /<img.*?alt="(.*?)"/

      // 1 get only img tags
      let imgCollection = string.match(imgPattern)
      return imgCollection.map(img => {
        return {
          src: img.match(hrefPattern)[1],
          alt: img.match(altPattern)[1],
        }
      })
    }

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
      eventPageData,
      wallPageData,
    }
  },
}
</script> 

<style lang="postcss">
  .hero {
    @apply w-full h-screen px-14 flex flex-wrap items-center justify-center;

    & .hero-item {
      width: 100%;
      flex: 1 1 auto;
      @apply text-center;

      & .cat-container {
        @apply mb-0;
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

    @apply flex flex-wrap justify-center items-center
    py-20 sm:py-32 md:py-40 lg:py-80 
    px-14 lg:px-0;
    
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


  /* wall */
  .container.wall {
    height: auto;
    max-width: 1280px; /* same as separator */
    min-height: inherit;

    .grid__container {
      aspect-ratio: 1 / 1;
      display: grid;
      grid-template-rows: repeat(3, 1fr);
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      @apply w-full h-auto relative overflow-hidden;

      .grid__item {
        aspect-ratio: 1 / 1;
        @apply relative overflow-hidden;

        .grid__fig {
          @apply w-full h-full;

          .grid__image {
            object-fit: cover;
            transform: scale(1);
            transition: transform 250ms ease-in;
            @apply w-full h-full;
          }

          .grid__caption {
            margin-top: 50%;
            margin-left: 50%;
            opacity: 0;
            z-index: 3;
            transform: translate(-50%, -50%);
            font-weight: 700;
            @apply absolute top-0 left-0 w-auto text-gray-50;
          }
        }

        &::before {
          content: '';
          opacity: 0;
          background-color: rgba(0, 0, 0, .6);
          transition: opacity 250ms ease-in-out;
          z-index: 1;
          @apply absolute top-0 left-0 w-full h-full;
        }
        &:hover,
        &:active,
        &:focus {

          .grid__image {
            transform: scale(1.1);
          }

          .grid__caption {
            opacity: 1;
          }

          &::before {
            opacity: 1;
          }
        }

      }
    }
  }

</style>
