<template>
  <Layout>
    <h1>Hill Climbing Algorithm</h1>
    <GraphContainer />
  </Layout>
</template>

<script>
import GraphContainer from '../components/graphContainer.vue';

export default {
  metaInfo: {
    title: 'Hill Climbing Algorithm'
  },
  mounted() {
    //this.$refs.graphContainer.drawGraph();
  },
  components: {
    GraphContainer,
  },
};
</script>
