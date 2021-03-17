<template>
  <div class="out-whole-style">
    <div class="valueCircle" id="valueCircle"></div>
  </div>
</template>

<script>

  import * as echarts from "echarts";

  export default {
    name: "ValueCircleGragh",
    props:{
      valueData:{
        type:Object,
        default(){
          return {
            "categories":[{name:"query"},{name:"value"}],
            "nodes":[
                {category:0, name: 'query', symbolSize:24, draggable: true},
                // {category:1, name: 'value1', symbolSize:20, draggable: true},
                // {category:1, name: 'value2', symbolSize:20, draggable: true}
                ],
            "links":[
                // {source : 'query', target : 'value1', weight : 1, name: '抽取值1'},
                // {source : 'query', target : 'value2', weight : 2, name: '抽取值2'}
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
              text: '测试步骤参数值抽取',
              subtext: '基于Bert+BiLstm+Crf',
              top: 'top',
              left: 'left'
          },
          grid: {
            left:'1%',
            top:'10%',
            containLabel:true
          },

          tooltip: {},
          legend: [{
              // selectedMode: 'single',
              data: this.valueData.categories.map(function (a) {
                  return a.name;
              })
          }],
          animationDuration: 10,
          animationEasingUpdate: 'quinticInOut',
          series: [
              {
                  name: '测试参数值抽取',
                  type: 'graph',
                  layout: 'force',
                  data: this.valueData.nodes,
                  links: this.valueData.links,
                  categories: this.valueData.categories,
                  roam: true,
                  force:{
                    repulsion: 260
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
        console.log('in value init valueData = ',this.valueData)
        this.option.series[0].data = this.valueData.nodes
        this.option.series[0].links = this.valueData.links
        this.option.series[0].categories = this.valueData.categories
      }
    },
    created() {
      this.$nextTick(()=>{
        this.drawValueCircle('valueCircle')
      })
    },
    watch: {
      valueData: function() {
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
    height: 100px;
    width: 500px;
    //margin: 2%;
    //position: center;
    //left: 1%;
  }
</style>