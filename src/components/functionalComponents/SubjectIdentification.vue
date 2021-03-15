<template>
  <div>
    <StepBar :active="active"></StepBar>
    <div class="tabs-style">
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
            <GraphTopology></GraphTopology>
            <div v-if="subject_knowledge_dict !== ''">
            </div>
          </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<script>
import StepBar from "@/components/baseUtils/StepBar";
import MindMap from "@/components/baseUtils/MindMap";
import GraphTopology from "@/components/baseUtils/GraphTopology";
  export default {
    name: "SubjectIdentification",
    data() {
      return {
        active: 0,
        usecase_data: this.$store.state.toAnalysisCase,
        ifUseCase: this.$store.state.toAnalysisCase.title.func_desc !== '',
        subject_knowledge_dict: ''
      }
    },
    methods:{

    },
    components:{
      StepBar,MindMap,GraphTopology
    }
  }
</script>

<style lang="less" scoped>
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