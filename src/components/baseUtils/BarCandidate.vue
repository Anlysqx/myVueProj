<template>
  <div class="bar-whole-style">
    <div class="candidate-bar-style" id="candidateBar"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

  export default {
    name: "BarCandidate",
    props:{
      tableData:Object
    },
    data(){
      return{
        charts: '',
        option: {
          title: {
              text: '测试参数抽取候选值',
              subtext: '基于Rouge算法',
          },
           grid: {
            left:'9%',
            top:'20%',
             // bottom: '5%',
            containLabel:true
          },
          xAxis: {
              type: 'category',
              title:'LCS',
              axisLabel: {
                 interval:0,
                 rotate:40
              },
              data: ['健康报警状态', '外循环回路压力值', '光照状态', '温度阈值下限', '温度阈值上限']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [2, 2, 4, 6, 6],
              type: 'bar',
              barWidth:16,
              showBackground:true,
              itemStyle:{
                 color:'#a4f69e'
              },
              label: {
                distance: 5,
                position: "top",
                show: true
              }
          }]
        }
      }
    },
    methods:{
      drawBar(id){ //之后这里的id传'pie'
         let dom = echarts.getInstanceByDom(document.getElementById(id)); //有的话就获取已有echarts实例的DOM节点。
         if (dom == null) { // 如果不存在，就进行初始化。
             dom = echarts.init(document.getElementById(id))
         }
         this.charts = dom
         this.charts.setOption(this.option)
      },
      barInit(){
        console.log('在bar init 中 tableData = ',this.tableData)
        this.option.xAxis.data = this.tableData[0]
        this.option.series[0].data = this.tableData[1]
      }
    },
    created() {
      this.$nextTick(()=>{
        this.drawBar('candidateBar')
      })
    },
    watch: {
      tableData: function() {
        console.log('执行了动态改变')
        this.barInit()
        this.drawBar('candidateBar')
      }
    }
  }
</script>

<style lang="less" scoped>
  .bar-whole-style{
    height: 100%;
  }
  .candidate-bar-style{
    height: 400px;
    width: 100%;
  }
</style>