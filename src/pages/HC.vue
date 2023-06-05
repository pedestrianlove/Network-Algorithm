<template>
  <Layout>
    <h1>Hill Climbing Algorithm</h1>
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
    title: 'Hill Climbing Algorithm'
  },
  mounted() {
    this.graphData = this.$generateData(20, 28);
    this.$refs.graphContainer.drawGraph(this.graphData);
  },
  methods: {
  },
  components: {
    GraphContainer,
  },
};
</script>
