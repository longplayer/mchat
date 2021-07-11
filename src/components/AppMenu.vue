<template>
  <nav>
    <div class="menu-item">
      <router-link :to="{name: 'home'}">
        Accueil
      </router-link>
    </div>
    <div class="menu-item" v-for="page in pages" :key="page.id">
      <router-link :to="page.slug">
        {{ page.title.rendered }}
      </router-link>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

// These values correspond to real data from WP
// This list also define order of the menu items
const allowedSlugs = ['actus', 'expos', 'wall', 'shop', 'contact', 'panier']

export default {
    setup() {
      const store = useStore()
      const pages = ref([])
      const dataPages = store.getters['wp/getPagesData']
      onMounted(() => {
        pages.value = allowedSlugs.map(slug => dataPages.filter(page => page.slug === slug)[0])
      })

      return { pages }
    },
}
</script>
