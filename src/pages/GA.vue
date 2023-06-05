<template>
  <Layout>
    <h1>Genetic Algorithm</h1>
    <GraphContainer />
  </Layout>
</template>

<script>
import GraphContainer from '../components/graphContainer.vue';

export default {
  metaInfo: {
    title: 'Genetic Algorithm'
  },
  mounted() {
    //this.$refs.graphContainer.drawGraph();
  },
  components: {
    GraphContainer,
  },
};
</script>
