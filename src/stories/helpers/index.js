// HOTFIX: Vue3 issue when show code
// source: https://stackoverflow.com/a/66589490/13454671
// sourcecode: https://github1s.com/storybookjs/storybook/blob/next/addons/docs/src/frameworks/

const stringifyArguments = (key, value) => {
  switch (typeof value) {
  case 'string':
      return `${key}="${value}"`;
  case 'boolean':
      return value ? key : '';
  default:
      return `:${key}="${value}"`;
  }
};
const generateSource = (templateSource, args) => {
  const stringifiedArguments = Object.keys(args)
  .map((key) => stringifyArguments(key, args[key]))
  .join(' ');

  return templateSource.replace('v-bind="args"', stringifiedArguments);
};

export default {
  stringifyArguments,
  generateSource,
}
