<template>
  <div>
    <StepBar :active="active"></StepBar>
    <div>
      <div v-if="is_work_flow">
        <div class="analyze-style">
          <el-button type="success" round @click="work_flow_btn_click">Analysis workflow</el-button>
        </div>
      </div>
      <div class="tabs-style" v-else>
        <el-tabs tab-position="top" type="border-card">
          <el-tab-pane label="测试用例">
            <div v-if="ifUseCase" class="content_style">
              <el-row class="my-el-row">
                <el-col :span="24">
                  <el-card shadow="hover" class="box-card">

                    <div class="usecase-style">
                      <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                        <p>标题</p>
                        <div>
                          <i>功能描述</i>
                          <div style="margin-left: 1%">
                            <span>{{usecase_data.title.func_desc}}</span>
                          </div>
                        </div>
                        <div>
                          <i>输入参数</i>
                          <div style="margin-left: 1%">
                            <span>{{usecase_data.title.input_param}}</span>
                          </div>
                        </div>
                        <div>
                          <i>判读参数</i>
                          <div style="margin-left: 1%">
                            <span>{{usecase_data.title.adjudge_param}}</span>
                          </div>
                        </div>
                      </el-col>
                        <el-col :span="10">
                          <p>测试步骤</p>
                          <div v-for="(one_step,index) in usecase_data.step_list">
                            <i>步骤{{index}} </i>
                            <span style="margin-left: 1%">{{one_step.step}} <br></span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主体识别">
            <span>主体识别</span>
          </el-tab-pane>
          <el-tab-pane label="测试设备知识库">
            <GraphTopology v-if="is_show_tree" :tableData="my_table_data"></GraphTopology>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import StepBar from "@/components/baseUtils/StepBar";
import GraphTopology from "@/components/baseUtils/GraphTopology";
import {get_equip_knowledge_base} from "@/network/network_request";
import {ElMessage} from "element-plus";

  export default {
    name: "SubjectIdentification",
    data() {
      return {
        active: 0,
        usecase_data: this.$store.state.toAnalysisCase,
        ifUseCase: this.$store.state.toAnalysisCase.title.func_desc !== '',
        subject_knowledge_dict: '',
        is_show_tree:true,
        is_work_flow:true,
        step_list: this.$store.state.toAnalysisCase["step_list"],
        my_table_data:this.$store.state.knowledge_tree
      }
    },
    watch:{
      my_table_data:function () {
        this.is_show_tree = false
        console.log('知识树发生了改变')
        this.is_show_tree = true
      }
    },
    methods:{
      // 得到测试主体后，用于进行测试用例分析
      work_flow_btn_click(){
        console.log('work flow btn click')
        if (this.step_list[0]['step'] === ''){
          ElMessage('请先选择一则测试用例')
        }else{
          this.is_work_flow = false
          this.query_server()
        }
      },

      query_server() {
        // 循环向服务器请求查询
        console.log('search btn click')
        console.log('this.step_result = ',this.step_result)
        // 这里应该直接把所有的query_step_list 传输出去
        get_equip_knowledge_base('/getEquipKnowledge', this.step_list).then(res => {
          console.log(res)
          this.$store.state.step_result = res.data.message["query_result"]
          console.log('this.$store.state.step_result = ',this.$store.state.step_result)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    components:{
      StepBar,GraphTopology
    }
  }
</script>

<style lang="less" scoped>
  .analyze-style{
    margin: 1%;
    margin-bottom: 4%;
    position: absolute;
    left: 40%;
    top: 30%;
    transform: translate(-50%,-50%,-50%,-50%);
  }
  el-tabs{
    padding: 0;
  }
  .tabs-style{
    margin: 2%;
    height: 520px;
  }
  .usecase-style{
    padding: 1%;
    background-color: #dfe2e5;
    margin-top: 0;
    color: #020d26;
    p{
      color: #0b2362;
      font-size: medium;
      font-weight: bold;
    }
    span{
      padding: 1%;
      margin: 3%;
      background-color: #FFFFFF;
      display: flow-root;
    }
  }
  .my-el-row{
    height: 100%;
  }
  .content_style{
    height: 100%;
  }
  .box-card{
    padding: 1%;
    height: 100%;
  }
  el-card{
    background-color: #8b9196;
  }
</style>