<template>
   <div id="app">
    <!-- <button @click="toUpdate">切换数据</button> -->
    <div id="container"></div>
  </div>
</template>

<script>
  import G6 from '@antv/g6'
  export default {
    name: "GraphTopology",
    data(){
      return {
      }
    },
    mounted() {
      const graph = new G6.Graph({
        container:'container',
        width:1000,
        height:600,
        fitView:true,
        fitViewPadding:[20, 40, 50, 20],
        modes:{
          default:['drag-canvas', 'zoom-canvas', 'click-select','drag-node']
        }
      });
      const main = async () => {
        const response = await fetch(
          'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json',
        );
        const remoteData = await response.json();
        graph.data(remoteData);
        graph.render();
      };
      main();
    },
    methods:{

    }
  }
</script>

<style lang="less" scoped>

</style>