<template>
  <div class="search-whole-style">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/workspace' }">工作台</el-breadcrumb-item>
      <el-breadcrumb-item>条例测试</el-breadcrumb-item>
    </el-breadcrumb>
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
              <el-option v-for="(one_file,index) in fileNameList" :label="one_file" :value="index"></el-option>
            </el-select>
          </template>
          <template #append>
            <el-button icon="el-icon-search" @click.native="searchBtnClick"></el-button>
          </template>
        </el-input>
      </div>
    </el-card>
    <div class="search-result-style">
        <el-tabs type="border-card">
          <el-tab-pane v-for="(value,key,index) in step_result" :label="key">
            {{value}}
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<script>
import {get_equip_knowledge_base, getLeftMenuItemListData} from "@/network/network_request";
  export default {
    name: "UseCaseSearch",
    data(){
      return {
        select:'',
        queryContent:'',
        fileNameList:[],
        step_result:{}
      }
    },
    methods:{
      getLeftMenuList(){
        getLeftMenuItemListData('/leftMenuData').then(res => {
          console.log('leftmenu item data = ',res)
          this.fileNameList = res.data.message.fileList
        }).catch(err => {
          console.log(err)
        })
      },
      searchBtnClick(){
        // 需要增加search 函数，向服务器请求查询
        console.log('search btn click select = ',this.select)
        console.log(this.queryContent)
        let step_list = [{"step":this.queryContent}]
        get_equip_knowledge_base('/getEquipKnowledge',step_list).then(res => {
          console.log(res)
          this.step_result = res.data.message["query_result"][0]
        }).catch(err => {
          console.log(err)
        })
      }
    },
    created() {
      this.getLeftMenuList()
    }
  }
</script>

<style lang="less" scoped>
  .search-result-style{
    height: 500px;
  }
  .case-data-search-style{
    height: 500px;
    overflow-y: auto;
    font-weight: bold;
  }
  .content_style{
    height: 100%;
    overflow-y: hidden;
    background-color: #d0d0d0;
    color: #273865;
    span{
      padding: 2%;
    }
  }
  .search-whole-style{
    height: 100%;
  }
</style>