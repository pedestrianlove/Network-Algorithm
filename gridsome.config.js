// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Tailwind settings
const tailwind = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')

const postcssPlugins = [
  tailwind(),
]

if (process.env.NODE_ENV === 'production') postcssPlugins.push(purgecss(require('./purgecss.config.js')))


// Server settings
module.exports = {
  siteName: 'Gridsome',
  siteUrl: 'https://pedestrianlove.github.io',
  pathPrefix: '/Network-Algorithm',
  plugins: [],
  css: {
	  loaderOptions: {
		  postcss: {
			  plugins: postcssPlugins,
		  },
	  },
  },
}
