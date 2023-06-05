// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// Import CSS
require('~/main.css')

// Import main layout
import DefaultLayout from '~/layouts/Default.vue'

// Import d3.js
import * as d3 from "d3";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

// Vue options
import VueCompositionAPI from '@vue/composition-api';
export default function (Vue, { router, head, isClient }) {
  // Use Composition API
  Vue.use(VueCompositionAPI);
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Setup tippy.js
  Object.defineProperty(Vue.prototype, '$tippy', { value: tippy });
}


