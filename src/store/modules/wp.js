import { DataApiService } from '../../services/DataApiService'
import { LocalStorageService } from '../../services/LocalStorageService'

// Mutate data states
// And save data to localStorage
const commitAfterFetch = (commit, payload) => {
  return DataApiService(payload.endpoint)
    .then(response => {
      commit(payload.mutation, response.data)
      LocalStorageService.setItem(payload.key, response.data)
      // console.log(response.data)
      return response.data
    })
}

export const namespaced = true
export const state = {
  // These values correspond to real data from WP
  // This list also define order of the menu items
  allowedSlugs: ['accueil', 'actus', 'expos', 'wall', 'contact'],
  // data from WP Rest API
  categories: [],
  comments: [],
  media: [],
  navigation: [],
  pages: [],
  posts: [],
  taxonomie: [],
  users: [],
}
export const mutations = {
  SET_PAGES(state, pages) {
    state.pages = pages
  },
  SET_POSTS(state, posts) {
    state.posts = posts
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_MEDIA(state, media) {
    state.media = media
  },
  SET_NAVIGATION(state, data) {
    state.navigation = data
  },
}
export const actions = {
  fetchPagesData({ commit }) {
    const KEY = 'wpPages'
    const data = LocalStorageService.getItem(KEY, [])
    if (data.length === 0) {
      return commitAfterFetch(commit, {
        endpoint: 'pages',
        mutation: 'SET_PAGES',
        key: KEY,
      })
    }
    return data
  },
  fetchPostsData({ commit }) {
    const KEY = 'wpPosts'
    const data = LocalStorageService.getItem(KEY, [])
    if (data.length === 0) {
      return commitAfterFetch(commit, {
        endpoint: 'posts',
        mutation: 'SET_POSTS',
        key: KEY,
      })
    }
    return data
  },
  fetchCategoriesData({ commit }) {
    const KEY = 'wpCategories'
    const data = LocalStorageService.getItem(KEY, [])
    if (data.length === 0) {
      return commitAfterFetch(commit, {
        endpoint: 'categories',
        mutation: 'SET_CATEGORIES',
        key: KEY,
      })
    }
    return data
  },
  fetchMediaData({ commit }) {
    const KEY = 'wpMedias'
    const data = LocalStorageService.getItem(KEY, [])
    if (data.length === 0) {
      return commitAfterFetch(commit, {
        endpoint: 'media',
        mutation: 'SET_MEDIA',
        key: KEY,
      })
    }
    return data
  },
  fetchPostsByCategory({ commit }, categoryId) {
    const KEY = 'wpPostCat-' + categoryId
    const data = LocalStorageService.getItem(KEY, [])
    if (data.length === 0) {
      return commitAfterFetch(commit, {
        endpoint: 'posts?categories=' + categoryId,
        mutation: 'SET_MEDIA',
        key: KEY,
      })
    }
    return data
  },
  saveNavigation({ commit }, data) {
    commit('SET_NAVIGATION', data)
  }
}
export const getters = {
  getPagesData: (state) => state.pages,
  getPostsData: (state) => state.posts,
  getCategoriesData: (state) => state.categories,
  getMediaData: (state) => state.media,
  getNavigationData: (state) => state.navigation,
}
