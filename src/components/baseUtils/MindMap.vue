<template>
<!--  <mindmap v-model="data"></mindmap>-->
</template>

<script>
  // import mindmap from '@hellowuxin/mindmap'
  export default {
    name: "MindMap",
    components:{
      // mindmap
    },
    data(){
      return {
        data:[{
            "name": "如何学习D3",
            "children": [
              {
                "name": "预备知识",
                "children": [
                  {"name": "HTML & CSS"},
                  {"name": "JavaScript"},
                ]
              },
              {
                "name": "安装",
                "_children": [
                  {"name": "折叠节点"}
                ]
              }
            ]}]
      }
    }
  }
</script>

<style lang="less" scoped>

</style>