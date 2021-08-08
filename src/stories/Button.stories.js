// import { Meta, Story } from '@storybook/vue3'
import { defineComponent } from 'vue'
import helpers from './helpers/index.js'

import BaseButton from '../components/BaseButton.vue'

export default {
  title: 'Base/Button',
  component: BaseButton,
  argTypes: {
    buttonClass: { control: 'text' },
    tag: { control: { type: 'select', options: ['button', 'a', 'router-link'] } },
    variant: { control: { type: 'select', options: ['primary', 'secondary', 'none'] } },
    onClick: {},
    default: {
      // should not be a prop!
      control: {
        type: 'text',
      },
      defaultValue: 'A Button Label',
      meta_description: 'slot content',
      table: {
        type: {
          summary: null,
        },
      },
    },
  },
}

const template = `\
<BaseButton @onClick="onClick" v-bind="args">
  <span v-html="args.default"></span>
</BaseButton>`
const Template = (args) => defineComponent({
  components: { BaseButton },
  setup: () => ({ args }),
  template
})

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  tag: 'button',
  default: '<b>primary button</b>',
}
Primary.parameters = {
  docs: {
    source: { code: helpers.generateSource(template, Primary.args) },
  },
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
  tag: 'button',
  default: 'Secondary Button',
}
Secondary.parameters = {
  docs: {
    source: { code: helpers.generateSource(template, Secondary.args) },
  },
}

export const None = Template.bind({})
None.args = {
  variant: 'none',
  tag: 'button',
  default: 'a simple text link'
}
None.parameters = {
  docs: {
    source: { code: helpers.generateSource(template, None.args) },
  },
}
