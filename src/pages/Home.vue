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
    <div class="section--inner">
      <WallImages
        title="Wall"
        :dataSource="wallPageData" />
    </div>
  </section>
  <section id="contact" class="contact container">
    <div class="section--inner">
      <h1>Contact</h1>
      <div
        ref="contactElement"
        class="content"
        v-html="contactData"
      ></div>
    </div>
  </section>
</template>

<script>
import { computed, ref, onBeforeUpdate, onMounted, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { anchorAddAttributes, clearChildren, searchTagOnString, stringSanitizer } from '@helpers/DOMUtils'
import CatLogoAnimated from '@components/CatLogoAnimated.vue'
import SeparatorImage from '@components/SeparatorImage.vue'
import PostList from '@components/PostList.vue'
import WallImages from '@components/WallImages.vue'

export default {
  components: {
    CatLogoAnimated,
    SeparatorImage,
    PostList,
    WallImages,
  },

  setup() {
    const store = useStore()
    const dataLimit = 5
    const isDataCleaned = ref(false)
    // API data
    const introData = computed(() => store.state.wp.navigation[0].content.rendered)
    const wallData = computed(() => store.state.wp.navigation.filter(page => page.slug === 'wall')[0].content.rendered)
    const contactData = computed(() => store.state.wp.navigation.filter(page => page.slug === 'contact')[0].content.rendered)
    // DOM element ref
    const introElement = ref(null) // dom element
    const contactElement = ref(null)
    // Components data
    const newsPageData = ref([])
    const eventPageData = ref([])
    const wallPageData = computed(() => searchTagOnString(wallData.value))
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

    onBeforeMount(() => {})
    onMounted(() => {})
    onBeforeUpdate(() => {
      if (!isDataCleaned.value) {
        isDataCleaned.value = true // run only once
        introContentCleaner(introElement.value, 2) // remove all elements after this index
        contactContentCleaner(contactElement.value)
      }
    })

    function introContentCleaner(elementRef, indexLimit) {
      if (elementRef === null) return

      const length = elementRef.children.length - 1
      for (let i = 0; i < length; i++) {
        if (i >= indexLimit) elementRef.children[elementRef.children.length - 1].remove()
      }
    }

    function contactContentCleaner(elementRef) {
      if (elementRef === null) return

      const indexToExclude = [0]
      const collection = Array.from(elementRef.querySelector('.wp-block-column').children)

      // Remove the original content
      clearChildren(elementRef)

      for (const [i, el] of collection.entries()) {
        if (!indexToExclude.includes(i)) {
          // add new attribute to the anchor tags
          anchorAddAttributes (el.querySelectorAll('a'))

          // put new modified element to our final container
          elementRef.append(el)
        }
      }
    }

    return {
      separatorImages,
      introData,
      introElement,
      newsPageData,
      eventPageData,
      wallPageData,
      contactData,
      contactElement,
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
</style>
