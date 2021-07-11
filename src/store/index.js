import { createStore } from 'vuex'
import * as wp from './modules/wp.js'

const store = createStore({
  state: {
    appName: 'Le site de Monsieur Chat',
  },
  modules: { wp },
})

export default store
