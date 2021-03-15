<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/workspace' }">工作台</el-breadcrumb-item>
      <el-breadcrumb-item>用例搜索</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片视图区-->
    <el-card>
      <div style="margin-top: 15px">
        <el-input
          placeholder="请输入内容"
          v-model="queryContent"
          class="input-with-select"
          clearable
          @keyup.enter.native="searchBtnClick"
        >
          <template #prepend>
            <el-select v-model="select" placeholder="请选择">
              <el-option label="功能描述" value="1"></el-option>
              <el-option label="输入参数" value="2"></el-option>
              <el-option label="判读参数" value="3"></el-option>
            </el-select>
          </template>
          <template #append>
            <el-button icon="el-icon-search" @click.native="searchBtnClick"></el-button>
          </template>
        </el-input>
      </div>
      <div v-if="isshow_knowledge" class="case-data-search-style">
        <el-collapse accordion>
          <el-collapse-item name="1">
            <template v-slot:title>
              <span class="span_title_style">热控系统设备知识库</span>
            </template>
            <div class="content_style" v-for="item of knowledge">
              <span>{{item[0]}} ':' {{item[1]}}</span>
            </div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template v-slot:title>
              <span class="span_title_style">测试参数候选列表</span>
            </template>
            <div class="content_style" v-for="one_candidate of candidates">
              <span>{{one_candidate[0]}} ' lcs = ' {{one_candidate[1]}}</span>
            </div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template v-slot:title>
              <span class="span_title_style">指令类型预测</span>
            </template>
            <div>
              <span>{{p_instruction_type}}</span>
            </div>
          </el-collapse-item>
          <el-collapse-item name="4">
            <template v-slot:title>
              <span class="span_title_style">指令参数数目预测</span>
            </template>
            <div>
              <span>{{p_param_num}}</span>
            </div>
          </el-collapse-item>
          <el-collapse-item name="5">
            <template v-slot:title>
              <span class="span_title_style">模型2候选集预测输出</span>
            </template>
            <div class="content_style" v-for="one_predict_item of model2_predict">
              <span>{{one_predict_item}}</span>
            </div>
          </el-collapse-item>
          <el-collapse-item name="6">
            <template v-slot:title>
              <span class="span_title_style">rules结果</span>
            </template>
            <div class="last_result_style"  v-for="one_last_predict of rule_res">
              <span>{{one_last_predict[0]}} ' value = ' {{one_last_predict[1]}}</span>
            </div>
          </el-collapse-item>
          <el-collapse-item name="7">
            <template v-slot:title>
              <span class="span_title_style">指令参数最终加权结果</span>
            </template>
            <div class="last_result_style"  v-for="one_last_predict of last_result">
              <span>{{one_last_predict[0]}} ' score = ' {{one_last_predict[1]}}</span>
            </div>
          </el-collapse-item>
          <el-collapse-item name="8">
            <template v-slot:title>
              <span class="span_title_style">指令参数值抽取结果</span>
            </template>
            <div class="content_style"  v-for="one_extract_values of extract_values">
              <span>{{one_extract_values}}</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {get_equip_knowledge_base} from "@/network/network_request";
  export default {
    name: "UseCaseSearch",
    data(){
      return {
        select:'',
        queryContent:'',
        isshow_knowledge:false,
        knowledge:'',
        candidates:'',
        p_instruction_type:'',
        p_param_num:'',
        model2_predict:'',
        rule_res:'',
        last_result:'',
        extract_values:''
      }
    },
    methods:{
      searchBtnClick(){
        // 需要增加search 函数，向服务器请求查询
        console.log('search btn click')
        console.log(this.queryContent)
        get_equip_knowledge_base('/getEquipKnowledge',this.queryContent).then(res => {
          console.log(res)
          this.isshow_knowledge = true
          // this.knowledge = {'name':['hello','hi']}
          this.knowledge = res.data.message.knowledge
          this.candidates = res.data.message.sorted_candidate
          this.p_instruction_type = res.data.message.p_instru_type
          this.p_param_num = res.data.message.p_param_num
          this.model2_predict = res.data.message.model2_output
          this.rule_res = res.data.message.ruls_res
          this.last_result = res.data.message.last_result
          this.extract_values = res.data.message.extract_values
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .last_result_style{
    background-color: #00d053;
    margin: 5%;
    padding: 3%;
    text-align: center;
  }
  .el-collapse-item{
    margin-top: 1%;
    span{
      color: #273865;
      font-weight: bold;
      padding: 5%;
    }
  }
  .case-data-search-style{
    height: 500px;
    overflow-y: auto;
    font-weight: bold;
  }
  .content_style{
    background-color: #d0d0d0;
    color: #273865;
    span{
      padding: 2%;
    }
  }
</style>