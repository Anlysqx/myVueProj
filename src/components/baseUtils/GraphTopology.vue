<template>
  <div>
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
      const two = {"id": "热控系统设备库", "label": "热控系统设备库", "children": [{"id": "equip_names", "label": "equip_names", "children": [{"id": "热控回路8", "label": "热控回路8"}, {"id": "热控回路2", "label": "热控回路2"}, {"id": "锂电池热控回路3", "label": "锂电池热控回路3"}, {"id": "热控回路4", "label": "热控回路4"}, {"id": "热控回路5", "label": "热控回路5"}, {"id": "PROGRAM", "label": "PROGRAM"}, {"id": "热控回路1", "label": "热控回路1"}, {"id": "锂电池热控回路1", "label": "锂电池热控回路1"}, {"id": "锂电池热控回路6", "label": "锂电池热控回路6"}, {"id": "热控回路3", "label": "热控回路3"}, {"id": "锂电池热控回路2", "label": "锂电池热控回路2"}, {"id": "锂电池热控回路5", "label": "锂电池热控回路5"}, {"id": "热控回路7", "label": "热控回路7"}]}, {"id": "MODE", "label": "MODE", "children": [{"id": "normal", "label": "normal"}]}, {"id": "温度阈值上限", "label": "温度阈值上限", "children": [{"id": "t2", "label": "t2"}, {"id": "t5", "label": "t5"}, {"id": "t3", "label": "t3"}, {"id": "t1", "label": "t1"}]}, {"id": "温度阈值下限", "label": "温度阈值下限", "children": [{"id": "t4", "label": "t4"}, {"id": "t1", "label": "t1"}, {"id": "t2", "label": "t2"}, {"id": "t6", "label": "t6"}, {"id": "t3", "label": "t3"}]}, {"id": "光照状态", "label": "光照状态", "children": [{"id": "阳照区", "label": "阳照区"}, {"id": "阴影区", "label": "阴影区"}]}, {"id": "健康报警状态", "label": "健康报警状态", "children": [{"id": "开启", "label": "开启"}, {"id": "关闭", "label": "关闭"}]}, {"id": "自控开关状态", "label": "自控开关状态", "children": [{"id": "断开", "label": "断开"}, {"id": "闭合", "label": "闭合"}]}, {"id": "热敏电阻PK85", "label": "热敏电阻PK85", "children": [{"id": "R2", "label": "R2"}, {"id": "R1", "label": "R1"}]}, {"id": "热敏电阻PK86", "label": "热敏电阻PK86", "children": [{"id": "R2", "label": "R2"}]}, {"id": "热敏电阻PK87", "label": "热敏电阻PK87", "children": [{"id": "R3", "label": "R3"}]}, {"id": "热敏电阻PK88", "label": "热敏电阻PK88", "children": [{"id": "R4", "label": "R4"}]}, {"id": "内循环回路压力值", "label": "内循环回路压力值", "children": [{"id": "P1", "label": "P1"}]}, {"id": "外循环回路压力值", "label": "外循环回路压力值", "children": [{"id": "P4", "label": "P4"}, {"id": "P5", "label": "P5"}]}, {"id": "电加热器电压值", "label": "电加热器电压值", "children": [{"id": "V3", "label": "V3"}, {"id": "V2", "label": "V2"}]}]}
      const graph = new G6.TreeGraph({
        container:'container',
        width:800,
        height:500,
        modes: {
          default: [
            {
              // 定义展开/收缩行为
              type: 'collapse-expand',
            },
            'drag-canvas',
          ],
        },
        layout:{
          type:'compactBox',
          direction: 'TB', // 自左至右布局，可选的有 H / V
          getHeight:()=>{
            return 20
          },
          getWidth:()=>{
            return 100
          },
          getHGap:()=>{
            return 5
          },
          getVGap:()=>{
            return 6
          }
        },
        defaultNode:{
          type:'ellipse',
          size: 20,
          style: {
            cursor: "default",
            fill: "rgb(239, 244, 255)",
            stroke: "rgb(232,235,239)"
          },
          labelCfg: {
            position: "center",
            style: {
              fontSize:20,
              textAlign: "center",
              fontStyle: "normal",
              fill: "rgb(70, 70, 70)"
            }
          }
        },
        defaultEdge: {
          type: 'lineDash',
          style: {
            lineWidth: 0.3,
            stroke: "rgb(10,253,1)",
            cursor: "default",
            shadowColor: "#464242"
          },
        },
        fitView:true,
        fitViewPadding: [16,16,16,16]
      })

      const my_json_data = {
        "id":"root",
        "label":"热控系统知识库",
        "children":[
            {
              "id": "Logistic regression",
              "label":"Logistic regression",
            }, {
              "id": "Linear discriminant analysis"
            }, {
              "id": "Rules",
              "label":"names",
              "children":[
                  {
                    "id": "Rules2"
                  },{
                    "id": "Rules3"
                  },{
                    "id": "Rules4"
                  },
                  {
                    "id": "Rules5"
                  },
                  {
                    "id": "Rules6"
                  },
                  {
                    "id": "Rules7"
                  },
                  {
                    "id": "Rules8"
                  },
                  {
                    "id": "Rules9"
                  }
              ]
            }
        ]
      }
      graph.read(my_json_data)
    },
    methods:{
    }
  }
</script>

<style lang="less" scoped>

</style>