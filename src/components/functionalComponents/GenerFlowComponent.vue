<template>
  <div class="script-whole-style">
    <StepBar :active="active"></StepBar>
    <div class="script-content-style">
      <el-row style="height: 100%">
        <el-col class="left-result-style" :span="16">
          <div v-if="isShowRight" class="right-result-style">
            <div class="form-style">
              <el-form ref="newCaseFormRef" size="small" :model="my_result" label-width="80px" class="new-case-form">
                <div class="title-style">
                  <el-form-item prop="func_desc" label="功能描述">
                    <el-input v-model="my_result.title.func_desc"></el-input>
                  </el-form-item>
                  <el-form-item prop="input_param" label="输入参数">
                    <el-input v-model="my_result.title.input_param"></el-input>
                  </el-form-item>
                  <el-form-item prop="adjudge_param" label="判读参数">
                    <el-input v-model="my_result.title.adjudge_param"></el-input>
                  </el-form-item>
                </div>
                <div class="step-style">
                  <div v-for="(one_step,step_index) in my_result['step_list']">
                    <div class="one-step-style">
                      <div>
                        <el-form-item prop="step" label="步骤描述">
                          <el-input v-model="one_step.step"></el-input>
                        </el-form-item>
                        <el-row justify="space-between">
                          <el-col :span="10">
                            <el-form-item prop="instr_type" label="指令类型">
                              <el-input v-model="one_step.code.instr_type"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="10">
                            <el-form-item prop="equip_name" label="设备名称">
                              <el-input v-model="one_step.code.instr_param.equip_name"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <div v-for="(one_param_item,param_index) in one_step.code.instr_param.param_list">
                          <el-row :gutter="30" type="flex" justify="space-around">
                              <el-col :span="10">
                                <el-form-item prop="param_name" label="参数名称">
                                  <el-input v-model="one_param_item.param_name"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="10">
                                <el-form-item prop="param_name" label="参数值">
                                  <el-input v-model="one_param_item.param_value"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="4">
                                <el-button @click="removeParam(step_index,param_index)" type="danger" icon="el-icon-delete" circle></el-button>
                              </el-col>
                          </el-row>
                        </div>
                        <el-row>
                          <el-form-item style="margin-left: 30%">
                            <el-button type="success" icon="el-icon-plus" circle @click="addParamPair(step_index)"></el-button>
                          </el-form-item>
                        </el-row>
                      </div>
                    </div>
                  </div>
                </div>
                <el-form-item class="form-action-btn">
                  <el-button type="success" @click="saveBtnClick">保存</el-button>
                  <el-button type="info" @click.native="resetBtnClick">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
        <el-col style="height: 100%" :span="8">
          <div class="modify-style">
            <div class="midify-title">
              <span>结果修改记录</span>
            </div>
            <div class="edit-modify-style">
              <div v-for="item in modify_diff_res">
                <div class="modify-span-style">
                  <span>{{item}}</span><br>
                </div>
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
export default {
  name: "GenerFlowComponent",
  data(){
    return {
      active:4,
      isShowRight:true,
      usecase_data: this.$store.state.toAnalysisCase,
      step_list:this.$store.state.toAnalysisCase["step_list"],
      step_result: this.$store.state.step_result,
      my_result:{},
      modify_diff_res:[]
    }
  },
  methods:{
    removeParam(step_index,param_index){
      this.my_result.step_list[step_index].code.instr_param.param_list.splice(param_index,1)
    },
    addParamPair(step_index){
      let tmp_pair = {"param_name": "", "param_value": ""}
      this.my_result.step_list[step_index].code.instr_param.param_list.push(tmp_pair)
    },
    check_diff_modify(now_res,origin_res){
      console.log(now_res)
      console.log(origin_res)
      let origin_step_list = origin_res["step_list"]
      let now_step_list = now_res["step_list"]
      let diff_res = []
      for (let i = 1;i< origin_step_list.length;i++){
        let tmp_diff = '步骤'+i+': '
        let origin_one = origin_step_list[i]
        let now_one = now_step_list[i]
        if (origin_one.code.instr_type !== now_one.code.instr_type){
          diff_res.push(tmp_diff + ' 指令类型修改为 => ' + now_one.code.instr_type)
        }
        if (origin_one.code.instr_param.equip_name !== now_one.code.instr_param.equip_name){
          diff_res.push(tmp_diff + ' 测试主体名称修改为 => '+now_one.code.instr_param.equip_name)
        }
        let origin_params = origin_one.code.instr_param.param_list
        let now_params = now_one.code.instr_param.param_list

        for (let j = 0;j < now_params.length;j++){
          let tmp_param = now_params[j].param_name
          let tmp_value = now_params[j].param_value
          let tmp_pair = '(' + tmp_param + ',' + tmp_value + ')'
          if (j > origin_params.length){
            diff_res.push(tmp_diff + ' 添加参数 => ' + tmp_pair)
          }else{
            let tmp_origin_pair =  '(' + origin_params[j].param_name + ',' + origin_params[j].param_value + ')'
            if (origin_params[j].param_name !== tmp_param || origin_params[j].param_value !== tmp_value){
              diff_res.push(tmp_diff + ' 修改参数 '+ tmp_origin_pair +' => '+ tmp_pair)
            }
          }
        }
        for (let j = now_params.length;j<origin_params.length;j++){
          let tmp_param = origin_params[j].param_name
          let tmp_value = origin_params[j].param_value
          let tmp_pair = '(' + tmp_param + ',' + tmp_value + ')'
          diff_res.push(tmp_diff + ' 删除参数 => ' + tmp_pair)
        }
      }
      if (diff_res.length === 0){
        diff_res.push('模型预测无误,无修改')
      }
      return diff_res
    },
    saveBtnClick(){
      console.log('保存修改')
      let last_res_list = this.step_result
      let origin_result = this.get_script_result(last_res_list)
      let diff_modify = this.check_diff_modify(this.my_result,origin_result)
      this.modify_diff_res = diff_modify
      console.log(this.modify_diff_res)
    },
    resetBtnClick(){
      console.log('reset btn click')
      let last_res_list = this.step_result
      this.my_result = this.get_script_result(last_res_list)
    },
    get_script_result(last_res_list){
      let my_result = {}
      my_result["title"] = this.usecase_data["title"]
      my_result["step_list"] = [
        {
          "step": "程序运行在正常模式下",
          "code": {
              "instr_type": "SETP",
              "instr_param": {
                  "equip_name": "PROGRAM",
                  "param_list": [
                      {
                          "param_name": "MODE",
                          "param_value": "normal"
                      }
                  ]
              }
          }
        }
      ]
      for (let i=1;i< last_res_list.length;i++){
        let item = last_res_list[i]
        let tmp = {
          "step": "",
          "code": {
              "instr_type": "",
              "instr_param": {
                  "equip_name": "",
                  "param_list": []
              }
          }
        }
        tmp.step = item.query
        tmp.code.instr_type = item.p_instru_type
        tmp.code.instr_param.equip_name = item.equip_name
        for (let one_pair of item.last_result){
          let param_pair = {
            "param_name": one_pair[0], "param_value": one_pair[1][0]}
          tmp.code.instr_param.param_list.push(param_pair)
        }
        my_result.step_list.push(tmp)
      }
      return my_result
    }
  },
  created() {
    console.log(this.usecase_data)
    let last_res_list = this.step_result
    this.my_result = this.get_script_result(last_res_list)
  },
  components:{
    StepBar
  }
}
</script>

<style lang="less" scoped>
  .modify-span-style{
    padding: 3px;
    margin: 3px;
    font-weight: bold;
    background-color: #e598a1;
  }
  .edit-modify-style{
    //border: 1px solid black;
    margin: 2%;
    padding: 1%;
    height: 500px;
    background-color: whitesmoke;
  }
  .midify-title{
    font-weight: bolder;
    background-color: #0e2876;
    margin: 2%;
    span{
      margin-left: 30%;
      color: whitesmoke;
    }
  }
  .form-action-btn{
    margin-left: 25%;
    margin-top: 5%;
  }
  .modify-style{
    //padding: 1%;
    //border: 1px solid black;
    height: 100%;
  }
  .title-style{
    padding: 2%;
    background-color: #f1eeee;
  }
  .one-step-style{
    padding: 2%;
    margin-top: 3px;
    background-color: #f3f5f2;
  }
  .form-style{
    background-color: #FFFFFF;
    padding: 2%;
    height: 500px;
    overflow-y: auto;
  }
  .left-result-style{
    background-color: #e9e9ea;
    padding: 1%;
    //border: solid 1px #000000;
    height: 90%;
  }
  .script-content-style{
    margin: 2%;
    background-color: #e9e9ea;
    height: 560px;
  }
  .script-whole-style{
    height: 100%;
    overflow-y: hidden;
  }
</style>