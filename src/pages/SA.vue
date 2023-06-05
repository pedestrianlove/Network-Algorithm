<template>
  <Layout>
    <h1>Simulated Annealing Algorithm</h1>
    <div ref="graphContainer"></div>
  </Layout>
</template>

<script>
import * as d3 from 'd3';

export default {
  metaInfo: {
    title: 'Simulated Annealing Algorithm'
  },
  mounted() {
    this.drawGraph();
  },
  methods: {
    generateData(numVertices, numEdges) {
      const graphData = {
        nodes: [],
        links: []
      };

      // Generate vertices
      for (let i = 1; i <= numVertices; i++) {
        graphData.nodes.push({ id: i, label: `${i}` });
      }

      // Generate edges
      for (let i = 0; i < numEdges; i++) {
        const source = Math.floor(Math.random() * numVertices) + 1;
        let target = Math.floor(Math.random() * numVertices) + 1;

        // Make sure target is not the same as source
        while (target === source) {
          target = Math.floor(Math.random() * numVertices) + 1;
        }

        graphData.links.push({ source, target });
      }

      return graphData;
    },
    drawGraph() {
      // Arbitrary data for the graph (vertices and edges)
      const numVertices = 20;
      const numEdges = 28;
      const graphData = this.generateData(numVertices, numEdges);

      // Dimensions and positioning for the graph
      const width = 1024;
      const height = 768;

      // Create an SVG container within the graph container
      const svg = d3.select(this.$refs.graphContainer)
          .append('svg')
          .attr('width', width)
          .attr('height', height);

      // Create a D3 force simulation
      const simulation = d3.forceSimulation(graphData.nodes)
          .force('link', d3.forceLink(graphData.links).id(d => d.id))
          .force('charge', d3.forceManyBody().strength(-50))
          .force('center', d3.forceCenter(width / 2, height / 2));

      // Create the edges/links between nodes
      const links = svg.selectAll('line')
          .data(graphData.links)
          .enter()
          .append('line')
          .style('stroke', 'black')
          .style('stroke-width', '1px');

      // Create the nodes
      const nodes = svg.selectAll('circle')
          .data(graphData.nodes)
          .enter()
          .append('circle')
          .attr('r', 12)
          .style('fill', 'steelblue');

      // Add labels to the nodes
      const labels = svg.selectAll('text')
          .data(graphData.nodes)
          .enter()
          .append('text')
          .text(d => d.label)
          .style('font-size', '12px')
          .attr('dx', 12)
          .attr('dy', 8);

      // Update the position of nodes and edges on each simulation tick
      simulation.on('tick', () => {
        links
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        nodes
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);

        labels
            .attr('x', d => d.x)
            .attr('y', d => d.y);
      });
    },
  },
};
</script>
