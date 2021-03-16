<template>
  <div>
    <div class="pie-style" id="pie">

    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

  export default {
    name: "ClsGragh",
    props:{
      tableData:Object
    },
    data(){
      return {
        charts: '',
        pieOp : {
          title: {
              text: '指令分类结果',
              subtext: '',
              left: 'center'
          },
          toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
          },
          grid: {
            left:'10%',
            top:'10%',
            containLabel:true
          },
          tooltip: {
              trigger: 'item'
          },
          legend: {
              orient: 'vertical',
              left: 'left',
          },
          series: [
              {
                  name: '分类输出概率',
                  type: 'pie',
                  radius: '50%',
                  data: [
                      {value: 50, name: 'GETVALUE'},
                      {value: 50, name: 'SETP'},
                  ],
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
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
         this.charts.setOption(this.pieOp)
      },
      pieInit(){
        console.log('tableData = ',this.tableData)
        this.pieOp.series[0].data = this.tableData
      }
    },
    created() {
      this.$nextTick(()=>{
        this.drawPie('pie')
      })
    },
    watch: {
      tableData: function() {
        console.log('执行了动态改变')
        this.pieInit()
        this.drawPie('pie')
      }
    }
  }
</script>

<style lang="less" scoped>
  .pie-style{
    display: inline-block;
    height: 220px;
    width: 500px;
    margin: 2%;
    position: center;
    left: 23%;
  }
</style>