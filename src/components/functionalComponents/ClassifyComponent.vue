<template>
  <div class="out-main-content-style">
    <StepBar :active="active"></StepBar>
    <div class="content-style">
      <div class="step_cls_result_style">
        <div @click="showResultBtnClick(index)" class="step-cls-style" v-for="(one_step,index) in step_list">
          <div style="margin-top: 15px">
          <el-input
            placeholder="请输入内容"
            v-model="one_step['step']"
            class="input-with-select"
          >
            <template #prepend>
              <el-tag
               size="medium"
               effect="dark"
              >
                步骤 {{index+1}}
              </el-tag>
            </template>
            <template #append>
              <el-tag
                  effect="dark"
                  type="success"
              >
                真实标签: {{one_step['code']['instr_type']}}
              </el-tag>
            </template>
          </el-input>
        </div>
        </div>
      </div>
      <div v-show="is_show" class="result_cls_style">
        <span style="color: #021547;margin: 1%">query : {{now_query}}</span>
        <cls-gragh :tableData="my_probs_data"></cls-gragh>
      </div>
    </div>
  </div>
</template>

<script>
import StepBar from "@/components/baseUtils/StepBar";
import ClsGragh from "@/components/baseUtils/ClsGragh";



export default {
  name: "ClassifyComponent",
  data(){
    return {
      active:1,
      is_show:false,
      step_list: this.$store.state.toAnalysisCase["step_list"],
      step_result: this.$store.state.step_result,
      one_cls_res:'',
      now_index:-1,
      my_probs_data:{},
      now_query:''
    }
  },
  methods:{
    process_one_cls_res(index){
      this.one_cls_res = this.step_result[parseInt(index)]
      console.log(this.one_cls_res)
      this.now_query = this.one_cls_res["query"]
      const probs = this.one_cls_res["p_instru_type_prob"]
      this.my_probs_data = [
                      {value: probs[0], name: 'GETVALUE'},
                      {value: probs[1], name: 'SETP'},
                  ]
      this.is_show = true
    },
    showResultBtnClick(index) {
      console.log('show result btn click')
      console.log(index)
      if (index === this.now_index){
        this.is_show = false
      }else{
        this.now_index = index
        this.is_show = false
        this.process_one_cls_res(parseInt(index))
      }
    },
  },
  components:{
    StepBar,ClsGragh
  }
}
</script>

<style lang="less" scoped>
  .out-main-content-style{
    height: 100%;
  }
  .result_cls_style{
    border:  1px #000000;
    border-radius: 1%;
    background-color: #FFFFFF;
    opacity:0.86;
    height: 240px;
    margin: 4%;
    overflow: hidden;
  }
  .content-style{
    margin-top: 2%;
  }
  .step_cls_result_style{
  }
  .step-cls-style{
    margin: 3%;
    :hover{
      cursor: pointer;
    }
  }
</style>