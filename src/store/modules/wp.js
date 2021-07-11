import serverApi from '../../services/index'
export const namespaced = true
export const state = {
  pages: [],
  posts: [],
  categories: [],
  media: [],
  users: [],
  taxonomie: [],
  comments: [],
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
}
export const actions = {
  fetchPagesData({ commit }) {
    return serverApi.getDataFromApi('pages')
      .then(response => {
        commit('SET_PAGES', response.data)
      })
  },
  fetchPostsData({ commit }) {
    return serverApi.getDataFromApi('posts')
      .then(response => {
        commit('SET_POSTS', response.data)
      })
  },
  fetchCategoriesData({ commit }) {
    return serverApi.getDataFromApi('categories')
      .then(response => {
        commit('SET_CATEGORIES', response.data)
      })
  },
  fetchMediaData({ commit }) {
    return serverApi.getDataFromApi('media')
      .then(response => {
        commit('SET_MEDIA', response.data)
      })
  },
}
export const getters = {
  getPagesData: (state) => state.pages,
  getPostsData: (state) => state.posts,
  getCategoriesData: (state) => state.categories,
  getMediaData: (state) => state.media,
}
