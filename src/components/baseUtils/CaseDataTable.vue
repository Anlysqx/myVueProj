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
          <span class="span_step_style">测试步骤 {{index + 1}}</span>
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
        tableData:{
    "title": {
        "func_desc": "普通回路热控阈值初始化处理测试",
        "input_param": "锂电池热控回路编号，阳照区、阴影区状态",
        "adjudge_param": "回路n温度阈值上限，回路n温度阈值下限"
    },
    "step_list": [
        {
            "step": "程序运行在正常模式下",
            "ex_res": "遥测程序运行在正常在轨模式下",
            "code": {
                "instr_type": "SETP",
                "instr_param": {
                    "equip_name": "program",
                    "param_list": [
                        {
                            "param_name": "mode",
                            "param_value": "normal"
                        }
                    ]
                }
            }
        },
        {
            "step": "发送指令设置热控回路n在阳照区下",
            "ex_res": "锂电池热控回路n转为阳照区",
            "code": {
                "instr_type": "SETP",
                "instr_param": {
                    "equip_name": "锂电池热控回路n",
                    "param_list": [
                        {
                            "param_name": "光照状态",
                            "param_value": "阳照区"
                        }
                    ]
                }
            }
        },
        {
            "step": "观察锂电池热控回路n温度阈值状态",
            "ex_res": "锂电池热控回路n温度阈值状态应为阳照区温度阈值",
            "code": {
                "instr_type": "GETVALUE",
                "instr_param": {
                    "equip_name": "锂电池热控回路n",
                    "param_list": [
                        {
                            "param_name": "温度阈值上限",
                            "param_value": ""
                        },
                        {
                            "param_name": "温度阈值下限",
                            "param_value": ""
                        }
                    ]
                }
            }
        }
    ]
}
      }
    },
    methods:{
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