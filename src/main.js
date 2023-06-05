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

  // Setup d3.js
  Vue.prototype.$d3 = d3;

  // Setup method to populate data
  Vue.prototype.$generateData = function generateData(numVertices, numEdges) {
    const graphData = {
      nodes: [],
      links: []
    };

    // Generate vertices
    for (let i = 1; i <= numVertices; i++) {
      graphData.nodes.push({ id: i, label: `${i}` });
    }

    // Generate minimum spanning tree(connected.)
    const edges = [];
    for (let i = 1; i <= numVertices - 1; i++) {
      edges.push({ source: i, target: i + 1 });
    }

    // Generate remaining edges randomly
    while (edges.length < numEdges) {
      const source = Math.floor(Math.random() * numVertices) + 1;
      let target = Math.floor(Math.random() * numVertices) + 1;

      // Make sure target is not the same as source or already connected
      if (source !== target && !edges.some(edge => (edge.source === source && edge.target === target) || (edge.source === target && edge.target === source))) {
        edges.push({ source, target });
      }
    }

    graphData.links = edges;

    return graphData;
  };
}


