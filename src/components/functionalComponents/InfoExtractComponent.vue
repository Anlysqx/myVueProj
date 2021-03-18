<template>
  <div class="extract-whole-style">
    <StepBar :active="active"></StepBar>
    <div class="content-style">
      <el-row style="height: 100%">
        <el-col style="height: 100%" :span="10">
          <div class="left-select-style">
            <div @click="showResultBtnClick(index)" class="step-cls-style" v-for="(one_step,index) in step_list">
              <el-tag type="success" >
                <span style="color: black">步骤{{index+1}}:  {{'   ' + one_step['step']}}</span>
              </el-tag>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div v-if="isShowRight" class="right-result-style">
            <div  class="value-label">
              <span style="font-weight: bolder">真实value:   </span>
              <span style="color: #00d053">{{now_step['code']['instr_param']['param_list']}}</span> <br>
              <span style="font-weight: bolder">query:  </span>
              <span style="color: #0529ac;font-weight: bold"> {{now_step['step']}}</span>
            </div>
            <div class="model-value">
              <value-circle-gragh :valueData="my_value_data"></value-circle-gragh>
            </div>
            <div class="candidate-style">
              <BarCandidate :tableData="now_candidates"></BarCandidate>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import StepBar from "@/components/baseUtils/StepBar";
import BarCandidate from "@/components/baseUtils/BarCandidate";
import ValueCircleGragh from "@/components/baseUtils/ValueCircleGragh";

  export default {
    name: "InfoExtractComponent",
    data(){
      return {
        active:2,
        isShowRight:false,
        step_list:this.$store.state.toAnalysisCase["step_list"],
        step_result: this.$store.state.step_result,
        now_step:'',
        now_result:'',
        now_candidates:'',
        now_index:-1,
        my_value_data:''
      }
    },
    methods:{
      showResultBtnClick(index){

          this.isShowRight = false
          console.log('index click = ',index)
          this.now_step = this.step_list[parseInt(index)]
          this.now_result = this.step_result[parseInt(index)]
          let a = []
          let b = []
          for (let item of this.now_result['sorted_candidate']){
            a.push(item[0])
            b.push(item[1])
          }
          this.now_candidates = [a,b]

          let value_graph = {
            "categories":[{name:"query"},{name:"value"}],
            "nodes":[
                {category:0, name: 'query', symbolSize:24, draggable: true},
                // {category:1, name: 'value1', symbolSize:20, draggable: true},
                ],
            "links":[
                // {source : 'query', target : 'value1', weight : 1, name: '抽取值1'},
            ]
          }
          for (let one_value of this.now_result['extract_values']){
            value_graph.nodes.push(
                {category:1, name: one_value, symbolSize:20, draggable: true}
            )
            value_graph.links.push(
                {source : 'query', target : one_value, weight : 1, name: one_value}
            )
          }
          this.my_value_data = value_graph


          console.log(this.now_candidates)
          this.isShowRight = true

      }
    },
    components:{
      StepBar,BarCandidate,ValueCircleGragh
    }
  }
</script>

<style lang="less" scoped>
  .model-value{
    margin: 1%;
    height: 15%;
    background-color: #fdfbfd;
  }
  .candidate-style{
    margin: 1%;
    height: 75%;
    background-color: #fdfbfd;
  }
  .value-label{
    background-color: #fdfbfd;
    margin: 1%;
    padding: 1%;
    height: 10%;
  }
  .right-result-style{
    background-color: #f1f6f3;
    padding: 1%;
    //border: solid 1px #000000;
    height: 100%;
  }
  .left-select-style{
    display: inline-block;
    position: absolute;
    top: 30%;
    transform: translate(0,50%,0,0);
    overflow-y: paged-y;
  }
  .step-cls-style{
    margin: 5%;
    :hover{
      cursor: pointer;
    }
  }
  .content-style{
    margin: 2%;
    height: 100%;
    background-color: #FFFFFF;
  }
  .extract-whole-style{
    height: 100%;
    overflow-y: hidden;
  }
</style>