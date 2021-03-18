<template>
  <div class="out-whole-style">
    <div class="valueCircle" id="valueCircle"></div>
  </div>
</template>

<script>

  import * as echarts from "echarts";

  export default {
    name: "Model2ResultGraph",
    props:{
      modelData:{
        type:Object,
        default(){
          return {
            "categories":[{name:"输出结果"}],
            "nodes":[
                {category:0, name: 'pair对得分', symbolSize:24, draggable: true},
                ],
            "links":[
            ]
          }
        }
      }
    },
    data(){
      return {
        charts:'',
        option :{
          title: {
              text: '模型2参数匹配结果',
              subtext: '基于SpERT模型',
              top: 'top',
              left: 'left'
          },
          grid: {
            left:'2%',
            top:'5%',
            containLabel:true
          },
          tooltip: {},
          legend: [{
              // selectedMode: 'single',
              data: this.modelData.categories.map(function (a) {
                  return a.name;
              })
          }],
          animationDuration: 10,
          animationEasingUpdate: 'quinticInOut',
          series: [
              {
                  name: 'model2参数匹配概率',
                  type: 'graph',
                  layout: 'force',
                  data: this.modelData.nodes,
                  links: this.modelData.links,
                  categories: this.modelData.categories,
                  roam: true,
                  force:{
                    repulsion: 100
                  },
                  label: {
                      formatter: '{b}',
                      position: "inside",
                      show:true
                  },
                  lineStyle: {
                      color: '#000000',
                      curveness: 0.4,
                      tyle:'dotted'
                  },
                  emphasis: {
                      focus: 'adjacency',
                      lineStyle: {
                          width: 10
                      }
                  }
              }
          ]
        }
      }
    },
    methods:{
      drawValueCircle(id){ //之后这里的id传'pie'
         let dom = echarts.getInstanceByDom(document.getElementById(id)); //有的话就获取已有echarts实例的DOM节点。
         if (dom == null) { // 如果不存在，就进行初始化。
             dom = echarts.init(document.getElementById(id))
         }
         this.charts = dom
         this.charts.setOption(this.option)
      },
      ValueCircleInit(){
        console.log('in model2result init modelData = ',this.modelData)
        this.option.series[0].data = this.modelData.nodes
        this.option.series[0].links = this.modelData.links
        this.option.series[0].categories = this.modelData.categories
      }
    },
    created() {
      this.$nextTick(()=>{
        this.drawValueCircle('valueCircle')
      })
    },
    watch: {
      modelData: function() {
        console.log('执行了动态改变')
        this.ValueCircleInit()
        this.drawValueCircle('valueCircle')
      }
    }
  }
</script>

<style lang="less" scoped>
  .out-whole-style{
    height: 100%;
  }
  .valueCircle{
    display: inline-block;
    height: 200px;
    width: 500px;
    //margin: 2%;
    //position: center;
    //left: 1%;
  }
</style>