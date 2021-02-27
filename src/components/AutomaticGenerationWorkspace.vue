<template>
    <el-container class="container-style">
      <el-header>
        <div>
            <img class="header-left-style" src="../assets/good1.jpeg" alt="">
            <span>工作台</span>
        </div>
        <exit-btn></exit-btn>
      </el-header>
      <el-container>
        <el-aside :width="iscollapseToggle ? '64px' : '200px'">
          <div class="toggle-btn" @click="toggleCollapse">
            <i class="el-icon-s-fold"></i>
          </div>
          <el-menu
            :default-active="activePath"
            :collapse="iscollapseToggle"
            :collapse-transition="false"
            :unique-opened="true"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#fff"
            text-color="#0b2362"
            active-text-color="#cbb81f">

<!--            一级菜单-->
            <el-submenu index="1">
<!--              一级菜单模板区域-->
              <template v-slot:title>
                <i class="el-icon-files"></i>
                <span>测试文件选取</span>
              </template>
<!--              二级菜单-->
              <el-menu-item v-for="oneFileName in fileNameList" :key="oneFileName" :index="oneFileName" @click.native="fileItemClick">
                <template v-slot:title>
                  <i class="el-icon-notebook-2"></i>
                  <span>{{oneFileName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
<!--              一级菜单模板区域-->
              <template v-slot:title>
                <i class="el-icon-document"></i>
                <span>测试用例</span>
              </template>
<!--              二级菜单-->
              <el-menu-item @click.native="caseItemClick" v-for="onecaseName in testCaseList" :key="onecaseName" :index="onecaseName">
                <template v-slot:title>
                  <i class="el-icon-data-analysis"></i>
                  <span>{{onecaseName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
<!--              一级菜单模板区域-->
              <template v-slot:title>
                <i class="el-icon-document-add"></i>
                <span>自定义用例</span>
              </template>
<!--              二级菜单-->
              <el-menu-item index="/newcase" @click.native="newCaseClick">
                <template v-slot:title>
                  <i class="el-icon-edit"></i>
                  <span>添加</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
<!--              一级菜单模板区域-->
              <template v-slot:title>
                <i class="el-icon-s-tools"></i>
                <span>功能组件</span>
              </template>
<!--              二级菜单-->
              <el-menu-item index="/info_classify" @click.native="classifyClick">
                <template v-slot:title>
                  <i class="el-icon-menu"></i>
                  <span>指令分类</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/info_extraction" @click.native="infoExtractionClick">
                <template v-slot:title>
                  <i class="el-icon-info"></i>
                  <span>信息抽取</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/code_generation" @click.native="codeGenerClick">
                <template v-slot:title>
                  <i class="el-icon-s-claim"></i>
                  <span>代码生成</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template v-slot:title>
                <i class="el-icon-document-add"></i>
                <span>工作流</span>
              </template>
              <el-menu-item index="/generation_flow" @click.native="generFlowClick">
                <template v-slot:title>
                  <i class="el-icon-s-operation"></i>
                  <span>脚本生成</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-aside width="200px">
          <case-data-table></case-data-table>
        </el-aside>
      </el-container>
    </el-container>
</template>

<script>
import ExitBtn from "@/components/baseUtils/ExitBtn";
import { getLeftMenuItemListData } from "@/network/network_request";
import CaseDataTable from "@/components/baseUtils/CaseDataTable";

export default {
  name: "AutomaticGenerationWorkspace",
  data(){
    return {
      fileNameList:['文件1','文件2','文件3','文件4'],
      testCaseList:['用例1','用例2','用例3','用例4'],
      name:'anlysqx',
      iscollapseToggle:false,
      activePath:'',
      isShowResultDetail:false
    }
  },
  created() {
    this.getLeftMenuList()
    this.activePath = window.sessionStorage.getItem("activePath")
    if (!this.activePath){
      this.activePath = '/newcase'
    }
  },
  methods:{
    saveActivePath(path){
      this.activePath = path
      window.sessionStorage.setItem("activePath",path)
    },
    classifyClick(){
      this.saveActivePath('/info_classify')
      this.$router.replace('/info_classify')
    },
    infoExtractionClick(){
      this.saveActivePath('/info_extraction')
      this.$router.replace('/info_extraction')
    },
    codeGenerClick(){
      this.saveActivePath('/code_generation')
      this.$router.replace('/code_generation')
    },
    generFlowClick(){
      this.saveActivePath('/generation_flow')
      this.$router.replace('/generation_flow')
    },
    newCaseClick(){
      this.saveActivePath('/newcase')
      this.$router.replace('/newcase')
    },
    toggleCollapse(){
      this.iscollapseToggle = !this.iscollapseToggle
    },
    fileItemClick(event){
      console.log(event)
      console.log(this.name,'文件')
      this.saveActivePath(event.index)
    },
    caseItemClick(event){
      console.log(event)
      console.log(this.name,'用例')
      this.saveActivePath(event.index)
    },
    getLeftMenuList(){
      getLeftMenuItemListData('/leftMenuData').then(res => {
        console.log('leftmenu item data = ',res)
        this.leftMenuList = res.data.message
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components:{
    ExitBtn,
    CaseDataTable
  }
}
</script>

<style lang="less" scoped>
  .toggle-btn{
    background-color: #faf6f6;
    font-size: 20px;
    line-height: 30px;
    color: #0b2362;
    text-align: center;
    cursor: pointer;
  }
  .container-style{
    height: 100%;
    overflow-y: hidden;
  }
  .el-header{
    background-color: #273865;
    color: white;
    border-radius: 2px;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    font-size: 20px;
    >div{
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }
  .el-main{
    background-color: #f0f0f0;
    border-radius: 3px;
  }
  .el-aside{
    background-color: #ffffff;
    border-radius: 3px;
    .el-menu{
      border-right: none;
    }
  }
  .header-left-style{
    width: 5%;
    height: 3%;
    border-radius: 50%;
  }
</style>