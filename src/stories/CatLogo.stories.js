import helpers from './helpers/index.js'
import CatLogoAnimated from '../components/CatLogoAnimated.vue'
// import CatLogoColored from '../components/CatLogoColored.vue'
// import CatLogoLines from '../components/CatLogoLines.vue'

export default {
  title: 'Cat/Animated',
  component: CatLogoAnimated,
  argTypes: {
    size: { control: { type: 'select', options: ['sm', 'md', 'lg', 'xl', 'xxl'] } }
  }
}
const template = '<CatLogoAnimated v-bind="args" />'
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CatLogoAnimated },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template,
});

export const Default = Template.bind({})
Default.args = {
  size: 'md'
}
Default.parameters = {
  docs: {
    source: { code: helpers.generateSource(template, Default.args) },
  },
};
