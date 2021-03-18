<template>
  <div>
    <div class="tree-style" id="tree"></div>
  </div>
</template>

<script>
  import * as echarts from "echarts";

  export default {
    name: "GraphTopology",
    props:{
      tableData:Object
    },
    data(){
      return {
        charts: '',
        option : {
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          grid:{
             top:"0px",
             left:"0px",
             right:"0px",
             bottom:"0px"
          },
          series: [
              {
                  type: 'tree',
                  data:[{'name': '热控系统知识库', 'children': [{'name': 'equip_names', 'children': [{'name': '热控回路8'}, {'name': '热控回路2'}, {'name': '锂电池热控回路3'}, {'name': '热控回路4'}, {'name': '热控回路5'}, {'name': 'PROGRAM'}, {'name': '热控回路1'}, {'name': '锂电池热控回路1'}, {'name': '锂电池热控回路6'}, {'name': '热控回路3'}, {'name': '锂电池热控回路2'}, {'name': '锂电池热控回路5'}, {'name': '热控回路7'}]}, {'name': 'MODE', 'children': [{'name': 'normal'}]}, {'name': '温度阈值上限', 'children': [{'name': 't2'}, {'name': 't5'}, {'name': 't3'}, {'name': 't1'}]}, {'name': '温度阈值下限', 'children': [{'name': 't4'}, {'name': 't1'}, {'name': 't2'}, {'name': 't6'}, {'name': 't3'}]}, {'name': '光照状态', 'children': [{'name': '阳照区'}, {'name': '阴影区'}]}, {'name': '健康报警状态', 'children': [{'name': '开启'}, {'name': '关闭'}]}, {'name': '自控开关状态', 'children': [{'name': '断开'}, {'name': '闭合'}]}, {'name': '热敏电阻PK85', 'children': [{'name': 'R2'}, {'name': 'R1'}]}, {'name': '热敏电阻PK86', 'children': [{'name': 'R2'}]}, {'name': '热敏电阻PK87', 'children': [{'name': 'R3'}]}, {'name': '热敏电阻PK88', 'children': [{'name': 'R4'}]}, {'name': '内循环回路压力值', 'children': [{'name': 'P1'}]}, {'name': '外循环回路压力值', 'children': [{'name': 'P4'}, {'name': 'P5'}]}, {'name': '电加热器电压值', 'children': [{'name': 'V3'}, {'name': 'V2'}]}]}],
                  left: '3%',
                  right: '1%',
                  top: '3%',
                  bottom: '20%',
                  symbol: 'roundRect',
                  symbolSize : 7,
                  orient: 'vertical',
                  itemStyle:{
                    color:'#80f876',
                    borderColor :'#ffffff'
                  },
                  lineStyle:{
                    color:'#1695ea',
                    curveness : 0.9,
                    width : 1.0
                  },
                  labelLayout:{
                    hideOverlap:true,
                  },
                  label: {
                      position: 'left',
                      verticalAlign: 'middle',
                      align: 'right',
                      color: '#021038',
                      fontSize: 12,
                      fontWeight:'bold'
                  },
                  leaves: {
                      label: {
                          position: 'right',
                          verticalAlign: 'middle',
                          align: 'left'
                      }
                  },
                  emphasis: {
                      focus: 'descendant'
                  },
                  expandAndCollapse: true,
                  roam:true,
                  animationDuration: 550,
                  animationDurationUpdate: 750
              }
          ]
        }
      }
    },
    methods:{
      drawPie(id){ //之后这里的id传'pie'
         let dom = echarts.getInstanceByDom(document.getElementById(id)); //有的话就获取已有echarts实例的DOM节点。
         if (dom == null) { // 如果不存在，就进行初始化。
             dom = echarts.init(document.getElementById(id))
         }
         this.charts = dom
         this.charts.setOption(this.option)
      },
      pieInit(){
        console.log('tableData = ',this.tableData)
        this.option.series[0].data = this.tableData
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.drawPie('tree')
      })
    },
    watch: {
      tableData: function() {
        console.log('执行了动态改变')
        this.pieInit()
        this.drawPie('pie')
      }
    },
    created() {

    }
  }
</script>

<style lang="less" scoped>
  .tree-style{
    display: inline-block;
    height: 500px;
    width: 800px;
  }
</style>