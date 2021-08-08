// const vue = require('@vitejs/plugin-vue')
// const { ViteAliases } = require('vite-aliases')
// const vitePlugins = [ vue(), ViteAliases() ]
const path = require('path')

// console.log(vitePlugins)

module.exports = {
  // async viteFinal(config, { configType }) {
  //   // customize the Vite config here
  //   config.plugins = [...config.plugins, ...vitePlugins]
  //   // return the customized config
  //   return config;
  // },
  // core: {
  //   builder: "storybook-builder-vite"
  // },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-postcss',
  ],
  // {
  //   name: "@storybook/addon-postcss",
  //   options: {
  //     postcssLoaderOptions: {
  //       implementation: require('postcss') // force use postCSS v.8
  //     }
  //   }
  // }
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.postcss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
      include: path.resolve(__dirname, '../'),
    })

    // Return the altered config
    return config
  },
}

// default configuration (untouched)
// module.exports = {
//   "stories": [
//     "../src/**/*.stories.mdx",
//     "../src/**/*.stories.@(js|jsx|ts|tsx)"
//   ],
//   "addons": [
//     "@storybook/addon-links",
//     "@storybook/addon-essentials"
//   ]
// }
