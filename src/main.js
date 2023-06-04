// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// Import CSS
require('~/main.css')

// Import main layout
import DefaultLayout from '~/layouts/Default.vue'

// Import d3.js
import * as d3 from "d3";


export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
