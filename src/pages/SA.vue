<template>
  <Layout>
    <h1>Simulated Annealing Algorithm</h1>
    <button
        @click="test"
    >
      TEST
    </button>
    <GraphContainer ref="graphContainer"/>
  </Layout>
</template>

<script>
import GraphContainer from '../components/graphContainer.vue';

export default {
  data() {
    return {
      graphData: null
    }
  },
  metaInfo: {
    title: 'Simulated Annealing Algorithm'
  },
  mounted() {
    this.graphData = this.$generateData(20, 28);
    this.$refs.graphContainer.drawGraph(this.graphData);
  },
  methods: {
    test() {
      this.graphData.nodes[0].label="TEST";
      this.$refs.graphContainer.drawGraph(this.graphData);
    }
  },
  components: {
    GraphContainer,
  },
};
</script>