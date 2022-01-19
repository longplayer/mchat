// https://v3.vuejs.org/guide/plugins.html#writing-a-plugin
import debounce from "lodash/debounce"

const PageScrollDirective = {
  mounted (el, binding) {
    el.__PageScroll__ = debounce(() => {
      binding.value()
    }, 200)
    document.addEventListener('scroll', el.__PageScroll__)
  },
  unmounted (el) {
    document.removeEventListener('scroll', el.__PageScroll__)
  }
}
export default (app) => {
  app.directive('page-scroll', PageScrollDirective);
}
