export const registerVueComponents = (vueApp, components) => {
  // Classic Vue3 approach will not work, use Vite way:
  // https://vitejs.dev/guide/features.html#glob-import
  // https://dev.to/jakedohm_34/auto-registering-all-your-components-in-vue-3-with-vite-4884

  Object.entries(components).forEach(([path, definition]) => {
    // Get name of component, based on filename
    const componentName = path.split('/').pop().replace(/\.\w+$/, '')
  
    // Register component on this Vue instance
    vueApp.component(componentName, definition.default)
  })
}

// HE: https://github.com/mathiasbynens/he
// https://gist.github.com/CatTail/4174511
