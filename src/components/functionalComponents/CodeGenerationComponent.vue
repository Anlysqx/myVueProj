<template>
  <div class="match-whole-style">
    <StepBar :active="active"></StepBar>
    <div class="match-content-style">
      <el-row style="height: 100%">
        <el-col style="height: 100%" :span="10">
          <div class="left-select-style">
            <div class="left-step-whole">
              <div @click="showResultBtnClick(index)" class="step-cls-style" v-for="(one_step,index) in step_list">
              <el-tag type="success" >
                <span style="color: black">步骤{{index+1}}:  {{'   ' + one_step['step']}}</span>
              </el-tag>
            </div>
            </div>
            <div v-show="isShowRight" class="pair-match-style">
              <PairMatchTable :pair_match_data="my_pair_match_data"></PairMatchTable>
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
            <div class="model-out-style">
              <model2-result-graph :model-data="my_model_data"></model2-result-graph>
            </div>
            <div class="rule-out-style">
              <span style="font-weight: bolder">基于平均LCS-index距离匹配结果</span>
              <br>
              <div style="margin-top: 5px" v-for="(item,index) in my_rule_data">
                <span class="span-style" :style="[{'backgroundColor':color_list[index % 4]}]" >{{item}}</span>
              </div>
            </div>
            <div class="param-out-style">
              <span style="font-weight: bolder">测试参数抽取加权输出结果</span>
              <br>
              <div style="margin-top: 5px" v-for="(item,index) in my_param_name_list">
                <span class="span-style" :style="[{'backgroundColor':color_list[index % 4]}]" >{{item}}</span>
              </div>
            </div>
            <div class="match-out-style">
              <span style="font-weight: bolder">参数匹配加权输出结果</span>
              <br>
              <div style="margin-top: 5px" v-for="(item,index) in my_last_match_list">
                <span class="span-style" :style="[{'backgroundColor':color_list3[index % 4]}]" >{{item}}</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import StepBar from "@/components/baseUtils/StepBar";
import PairMatchTable from "@/components/baseUtils/PairMatchTable";
import Model2ResultGraph from "@/components/baseUtils/Model2ResultGraph";

export default {
  name: "CodeGenerationComponent",
  data(){
    return {
      active:3,
      isShowRight:false,
      step_list:this.$store.state.toAnalysisCase["step_list"],
      step_result: this.$store.state.step_result,
      now_step:'',
      now_result:'',
      my_pair_match_data:[],
      my_model_data:{},
      my_rule_data:'',
      my_param_name_list:[],
      my_last_match_list:[],
      color_list : ['#7d7cd5', 'green', 'orange', 'purple'],
      color_list3 : ['orange', 'purple','#7d7cd5', 'green', ]
    }
  },
  methods:{
    get_last_match_list(value_match_list){
      let res = []
      for (let one_value_match of value_match_list){
        let tmp = '(' + one_value_match[0] + ',' + one_value_match[1][0] + ')'
        res.push(tmp)
      }
      return res
    },
    get_param_name_list(value_match_list){
      let res = []
      for (let one_value_match of value_match_list){
        let tmp = one_value_match[0]
        res.push(tmp)
      }
      return res
    },
    get_rule_result(rule_list){
      let res = []
      for (let one_rule of rule_list){
        let tmp = '(' + one_rule[0] + ',' + one_rule[1] + ')'
        res.push(tmp)
      }
      if (res.length === 0){
        res.push('(None,None)')
      }
      return res
    },
    get_model2_result(res_list){
      let a = {
            "categories":[{"name":"输出结果"}],
            "nodes":[],
            "links":[]
          }
      // let color_list = ['blue', 'green', 'orange', 'purple']
      let color_pointer = 0
      let tmp_color = ['blue', 'green', 'orange', 'purple']
      for (let item of res_list){
        let one_item_name = item[0]+','+item[1]
        let one_item_size = 14 + parseInt(20*item[3])
        a.nodes.push({"itemStyle":{"color":tmp_color[color_pointer % 4]},"category":0, "name": one_item_name, "symbolSize":one_item_size, "draggable": true})
        color_pointer += 1
      }
      return a
    },
    showResultBtnClick(index) {
      this.isShowRight = false
      console.log('index click = ', index)
      this.now_step = this.step_list[parseInt(index)]
      this.now_result = this.step_result[parseInt(index)]
      console.log(this.now_result)
      this.my_pair_match_data = this.now_result["candidates_for_match_pair"]
      let model2_res_list = this.now_result["model2_output"]
      this.my_model_data = this.get_model2_result(model2_res_list)
      let now_rule_list = this.now_result["ruls_res"]
      this.my_rule_data = this.get_rule_result(now_rule_list)
      let value_match_list = this.now_result["last_result"]
      this.my_param_name_list = this.get_param_name_list(value_match_list)
      this.my_last_match_list = this.get_last_match_list(value_match_list)
      this.isShowRight = true
    }
  },
  created() {
  },
  components:{
    StepBar,PairMatchTable,Model2ResultGraph
  }
}
</script>

<style lang="less" scoped>
  .span-style{
    padding: 5px;
    float: left;
    color: whitesmoke;
    margin: 5px;
  }
  .param-out-style{
    height: 10%;
    margin: 1%;
    background-color: #fdfbfd;
  }
  .match-out-style{
    height: 40%;
    margin: 1%;
    background-color: #fdfbfd;
  }
  .rule-out-style{
    height: 10%;
    margin: 1%;
    background-color: #fdfbfd;
  }
  .model-out-style{
    height: 30%;
    margin: 1%;
    background-color: #fdfbfd;
  }
  .value-label{
    background-color: #fdfbfd;
    margin: 1%;
    padding: 1%;
    height: 10%;
  }
  .step-cls-style{
    margin: 4%;
    :hover{
      cursor: pointer;
    }
  }
  .pair-match-style{
    background-color: #fdfdfd;
    height: 65%;
    margin: 1%;
    padding: 1%;
  }
  .left-step-whole{
    background-color: #fafafa;
    height: 35%;
    top: 20px;
    //margin: 1%;
    padding: 1%;
  }
  .right-result-style{
    background-color: #ecf5f0;
    padding: 1%;
    //border: solid 1px #000000;
    height: 100%;
  }
  .left-select-style{
    background-color: #f1f5f8;
    padding: 1%;
    //border: solid 1px #000000;
    height: 100%;
  }
  .match-content-style{
    margin: 2%;
    background-color: #f1f5f8;
    height: 100%;
  }
  .match-whole-style{
    height: 100%;
    overflow-y: hidden;
  }
</style>