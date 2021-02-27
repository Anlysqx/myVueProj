<template>
  <div>
<!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/workspace' }">工作台</el-breadcrumb-item>
      <el-breadcrumb-item>添加用例</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="new-case-form-div">
      <el-form ref="newCaseFormRef" size="small" :model="newCaseForm" label-width="80px" class="new-case-form">
        <div class="title-style">
          <el-form-item prop="func_desc" label="功能描述">
            <el-input v-model="newCaseForm.title.func_desc"></el-input>
          </el-form-item>
          <el-form-item prop="input_param" label="输入参数">
            <el-input v-model="newCaseForm.title.input_param"></el-input>
          </el-form-item>
          <el-form-item prop="adjudge_param" label="判读参数">
            <el-input v-model="newCaseForm.title.adjudge_param"></el-input>
          </el-form-item>
        </div>
        <div v-for="(one_step,step_index) in newCaseForm['step_list']">
          <div class="one-step-style">
<!--            <span>步骤 {{step_index+1}}</span>-->
            <div>
              <el-form-item prop="step" label="步骤描述">
                <el-input v-model="one_step.step"></el-input>
              </el-form-item>
              <el-form-item prop="ex_res" label="期望结果">
                <el-input v-model="one_step.ex_res"></el-input>
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
              <el-row type="flex" justify="center">
                <el-form-item>
                  <el-button type="info" plain icon="el-icon-plus" circle @click="addParamPair(step_index)"></el-button>
                </el-form-item>
              </el-row>
              <el-row class="step-add-style" type="flex" justify="center">
                <el-form-item>
                  <el-button @click="removeStep(step_index)"><i class="el-icon-minus"></i></el-button>
                  <el-button @click="addStep"><i class="el-icon-plus"></i></el-button>
                </el-form-item>
              </el-row>
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
</template>

<script>
import { saveOneNewCaseToDataSet } from "@/network/network_request";

export default {
  name: "NewCase",
  data(){
    return {
      newCaseForm:this.$store.state.selfWriteCase
    }
  },
  methods:{
    saveSuccess(){
      this.$message({
          message: '保存成功',
          type: 'success'
        });
    },
    saveFail(){
      this.$message.error('自定义用例保存失败');
    },
    saveBtnClick(){
      this.$store.state.isShowUseInstruction = false
      this.$store.state.selfWriteCase = this.newCaseForm
      this.$store.state.toAnalysisCase = this.newCaseForm
      console.log('this.$store.state.toAnalysisCase = ',this.$store.state.toAnalysisCase)
      this.$router.replace('/generation_flow')
      //当新数据不为空时，将新保存的case数据保存到测试用例用户自定义文件数据库中
      console.log('-----------------')
      console.log(this.newCaseForm.title.func_desc)
      console.log(this.newCaseForm.title.func_desc !== '')
      if (this.newCaseForm.title.func_desc !== ''){
        saveOneNewCaseToDataSet('/saveOneNewCase',this.newCaseForm).then(res => {
          let tmp_res_code = res.data.code
          if (tmp_res_code === 200){
            this.saveSuccess()
          }else{
            console.log(res)
            this.saveFail()
          }
        }).catch(err => {
          console.log(err)
          this.saveFail()
        })
      }
      return this.newCaseForm
    },
    //点击重置，把表单设置为vuex里面state的defaultCase空值
    resetBtnClick(){
      console.log('reset')
      this.newCaseForm = this.$store.state.defaultCase
      this.$store.state.selfWriteCase = this.newCaseForm
      this.$refs.newCaseFormRef.resetFields()
    },
    removeParam(step_index,param_index){
      this.newCaseForm.step_list[step_index].code.instr_param.param_list.splice(param_index,1)
    },
    removeStep(step_index){
      this.newCaseForm.step_list.splice(step_index,1)
    },
    addParamPair(step_index){
      console.log(step_index)
      // console.log(this.newCaseForm.step_list[step_index].code.instr_param)
      this.newCaseForm.step_list[step_index].code.instr_param.param_list.push({ "param_name": "", "param_value": "" })
    },
    addStep(){
      this.newCaseForm.step_list.push({
                "step": "",
                "ex_res": "",
                "code": {
                    "instr_type": "",
                    "instr_param": {
                        "equip_name": "",
                        "param_list": [
                            {
                                "param_name": "",
                                "param_value": ""
                            }
                        ]
                    }
                }
            })
    }
  }
}
</script>

<style lang="less" scoped>
  .title-style{
    padding: 15px;
    background-color: #f5faf2;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    :hover{
      font-weight: bolder;
    }
  }
  .one-step-style{
    background-color: #fcf9f9;
    padding: 15px;
    margin: 3px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    :hover{
      font-weight: bold;
    }
  }
  .step-add-style{
    margin-top: 20px;
  }
  .form-action-btn{
    display: flex;
    justify-content: flex-end;
    margin-top: 3px;
  }
  .new-case-form-div{
    margin: 10%;
    margin-top: 5%;
    padding: 5%;
    background-color: #FFFFFF;
    border-radius: 5px;
    height: 430px;
    overflow-y: auto;
    span{
      margin: 10%;
    }
  }
</style>