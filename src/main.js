import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

const app = createApp(App)

// Classic Vue3 way will not work, use Vite way:
// https://vitejs.dev/guide/features.html#glob-import
// https://dev.to/jakedohm_34/auto-registering-all-your-components-in-vue-3-with-vite-4884
const components = import.meta.globEager('./components/Base*.vue')
Object.entries(components).forEach(([path, definition]) => {
  // Get name of component, based on filename
  const componentName = path.split('/').pop().replace(/\.\w+$/, '')

  // Register component on this Vue instance
  app.component(componentName, definition.default)
})

app.use(router).use(store).mount('#app')
