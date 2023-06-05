<template>
  <Layout>
    <h1>Simulated Annealing Algorithm</h1>
    <GraphContainer />
  </Layout>
</template>

<script>
import GraphContainer from '../components/graphContainer.vue';

export default {
  metaInfo: {
    title: 'Simulated Annealing Algorithm'
  },
  mounted() {
    //this.$refs.graphContainer.drawGraph();
  },
  components: {
    GraphContainer,
  },
};
</script>