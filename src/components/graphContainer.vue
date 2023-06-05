<template>
  <div ref="graphContainer"></div>
</template>

<script>
export default {
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
    },
    drawGraph() {
      // Arbitrary data for the graph (vertices and edges)
      const numVertices = 20;
      const numEdges = 28;
      const graphData = this.generateData(numVertices, numEdges);

      // Dimensions and positioning for the graph
      const width = 1920;
      const height = 1080;

      // Create an SVG container within the graph container
      const svg = this.$d3.select(this.$refs.graphContainer)
          .append('svg')
          .attr('width', width)
          .attr('height', height);

      // Create a D3 force simulation
      const simulation = this.$d3.forceSimulation(graphData.nodes)
          .force('link', this.$d3.forceLink(graphData.links).id(d => d.id).distance(50).strength(1))
          .force('charge', this.$d3.forceManyBody().strength(-250))
          .force('collide', this.$d3.forceCollide(100))
          .force('center', this.$d3.forceCenter(width / 2, height / 2));

      // Create the edges/links between nodes
      const links = svg.selectAll('line')
          .data(graphData.links)
          .enter()
          .append('line')
          .style('stroke', 'black')
          .style('stroke-width', '5px');

      // Initialize Tippy.js tooltips on links
      this.$tippy(links.nodes(), {
        content: (reference) => {
          const link = this.$d3.select(reference).datum();
          return `Weight: ${link.weight}`;
        },
        placement: 'bottom',
        offset: [0, 4],
      });
      links.on("mouseover", function(link) {
        // Change the color of the edge
        this.$d3
            .select(this)
            .style("stroke", "red");
      });
      links.on("mouseout", function(link) {
        // Reset the color to black
        this.$d3
            .select(this)
            .style("stroke", "black");
      });

      // Create the nodes
      const nodes = svg.selectAll('circle')
          .data(graphData.nodes)
          .enter()
          .append('circle')
          .attr('r', 20)
          .style('fill', 'steelblue');

      // Add labels to the nodes
      const labels = svg.selectAll('text')
          .data(graphData.nodes)
          .enter()
          .append('text')
          .text(d => d.label)
          .style('font-size', '12px')
          .style('fill', 'white')

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