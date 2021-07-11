import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as wp from './modules/wp.js'

const store = createStore({
  state: {
    appName: 'Le site de Monsieur Chat',
  },
  modules: { wp },
  plugins: [ createPersistedState() ]
})

export default store
