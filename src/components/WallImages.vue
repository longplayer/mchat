<template>
  <h1 v-if="title">
    {{ title }}
  </h1>
  <div class="grid__container" ref="wallElement">
    <div
      v-for="(image, index) in dataSource"
      :key="index"
      class="grid__item"
      tabindex="0"
      @click="showLightbox(index)"
    >
      <figure class="grid__fig">
        <img class="grid__image" :src="image.thumb" :alt="image.alt" />
        <caption class="grid__caption">
          {{
            image.alt
          }}
        </caption>
      </figure>
    </div>

    <!-- https://v3.vuejs.org/api/built-in-components.html#teleport -->
    <!-- https://github.com/am283721/vue-my-photos/blob/master/src/lightbox.vue -->
    <teleport to=".modal-portal">
      <base-lightbox 
        ref="wallElement"
        :images="images"
        :close-on-backdrop-click=true
        :current-image-index="currentImageIndex"
        @on-lightbox-close="onLightboxClose"
        @on-lightbox-change="onLightboxChange"
      />
    </teleport>
  </div>
</template>

<script>
import { computed, ref, onBeforeUpdate, onMounted, onBeforeMount } from 'vue'
import bodyOverflow from '@helpers/bodyOverflow.js'

export default {
  props: {
    dataSource: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
    },
  },
  setup(props) {
    const wallElement = ref(null)
    const images = ref(updateImagesData(props.dataSource))
    const currentImageIndex = ref(-1)

    function showLightbox(imageIndex) {
      currentImageIndex.value = imageIndex;
      bodyOverflow(true)
    }

    function onLightboxClose(imageIndex) {
      currentImageIndex.value = imageIndex;
      bodyOverflow(false)
    }

    function onLightboxChange(image) {}

    function updateImagesData(source) {
      // return array of objects
      return source.map((data, index) => {
        return {
          ...data,
          name: data.alt,
          filter: '',
          index,
        }
      });
    }

    return {
      wallElement,
      showLightbox,
      onLightboxClose,
      onLightboxChange,
      images,
      currentImageIndex,
    }
  },
}
</script>

<style lang="postcss" scoped>
button {
  position: absolute;
  top: 50%;
  padding: 1rem;
  z-index: 10;
  font-size: 0.5em;
  background-color: tomato;
  transform: translate(-100%, -50%);
  transition: transform 200ms ease;
  @apply bg-white;

  &.prev {
    left: 0;
    transform: translate(0, -50%);
  }
  &.next {
    right: 0;
    transition: transform 200ms ease;
    transform: translate(0, -50%);
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
      cursor: pointer;
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
        background-color: rgba(0, 0, 0, 0.6);
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

/* wall modal */
.viewer__modal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.8);
  @apply flex justify-center items-center overflow-hidden;

  .viewer__container {
    width: 80%;
    height: 80%;
    @apply relative overflow-hidden;

    .viewer__fig {
      @apply m-auto absolute;

      &--inner {
        width: 100%;
        height: 100%;

        .viewer__image {
          object-fit: contain;
          width: auto;
          height: 100%;
          margin: auto;
        }
      }

      /* .viewer__caption {
        width: 100%;
        height: 10%;
        font-weight: 700;
        @apply absolute bottom-0 left-0 flex justify-center items-center m-auto text-gray-50;
      } */
    }

  }
}
</style>
