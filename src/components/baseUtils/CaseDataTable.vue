<template>
  <div class="case-data-table-style">
    <el-collapse :v-model="tableData" @change="handleChange">
      <el-collapse-item name="1">
        <template v-slot:title>
          <span class="span_title_style">测试描述</span>
        </template>
        <div class="title_div">
          <div>
            <span>功能描述:</span>
            <div class="content_style">
              {{tableData.title.func_desc}}
            </div>
          </div>
          <div>
            <span>输入参数:</span>
            <div class="content_style">
              {{tableData.title.input_param}}
            </div>
          </div>
          <div>
            <span>判读参数:</span>
            <div class="content_style">
              {{tableData.title.adjudge_param}}
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item v-for="(one_step,index) in tableData.step_list" :name="index">
        <template v-slot:title>
<!--          <span class="span_step_style">测试步骤 {{index + 1}}</span>-->
          <span class="span_step_style">{{getStepSpan(one_step.step)}}</span>
        </template>
        <div class="step_div">
          <div>
            <span>步骤描述:</span>
            <div class="content_style">
              {{one_step.step}}
            </div>
          </div>
          <div>
            <span>期望结果:</span>
            <div class="content_style">
              {{one_step.ex_res}}
            </div>
          </div>
          <div>
            <span>代码:</span>
            <div class="content_style">
              {{one_step.code}}
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    name: "CaseDataTable",
    data(){
      return {
        tableData:this.$store.state.toAnalysisCase
      }
    },
    methods:{
      getStepSpan(step_text){
        let str_len = step_text.length
        let result_str = ''
        if (str_len >= 7){
          result_str = step_text.substr(0,7)
        }else{
          result_str = step_text
        }
        return result_str + '...'
      },
      handleChange(){

      },
      changeData(newData){
        this.tableData = newData
      }
    }
  }
</script>

<style lang="less" scoped>
  .case-data-table-style{
    height: 600px;
    overflow-y: auto;
  }
  .content_style{
    background-color: #d0d0d0;
    padding: 5%;
    color: #273865;
  }
  .el-collapse{
    color: #273865;
  }
  .title_div{
    padding: 5%;
    span{
      font-weight: bold;
      color: #273865;
    }
  }
  .step_div{
    padding: 5%;
    span{
      font-weight: bold;
      color: #273865
    }
  }
  .span_step_style{
    font-weight: bolder;
    text-align: center;
    margin-left: 10%;
    color: #273865
  }
  .span_title_style{
    color: #273865;
    font-weight: bolder;
    text-align: center;
    margin-left: 50%;
    transform: translate(-50%);
  }
</style>