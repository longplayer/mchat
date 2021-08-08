import HelloBro from '../components/HelloBro.vue'
import '../index.css' // import css variable

export default {
  title: 'Atoms/HelloBro',
  component: HelloBro,
  argTypes: {
    // colorType: { control: 'color' },
    colorType: { control: { type: 'select', options: ['primary', 'secondary'] } },
    // onClick: {},
  },
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { HelloBro },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<hello-bro v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  message: 'Primary Bro',
  colorType: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  message: 'Secondary Bro',
  colorType: 'secondary'
};
