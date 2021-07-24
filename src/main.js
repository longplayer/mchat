import { createApp } from 'vue'
import { registerVueComponents } from './helpers'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

const app = createApp(App)

// Auto registrate components
const baseComponents = import.meta.globEager(`./components/Base*.vue`)
registerVueComponents(app, baseComponents)

app.use(router).use(store).mount('#app')
