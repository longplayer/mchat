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
  setPagesData({ commit }, pages) {
    commit('SET_PAGES', pages)
  },
  setPostsData({ commit }, posts) {
    commit('SET_POSTS', posts)
  },
  setCategoriesData({ commit }, categories) {
    commit('SET_CATEGORIES', categories)
  },
  setMediaData({ commit }, media) {
    commit('SET_MEDIA', media)
  },
}
export const getters = {
  getPagesData: (state) => state.pages,
  getPostsData: (state) => state.posts,
  getCategoriesData: (state) => state.categories,
  getMediaData: (state) => state.media,
}
