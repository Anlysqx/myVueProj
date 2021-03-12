<template>
    <el-container class="container-style">
      <el-header>
        <div @click="headerClick">
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
              <el-menu-item v-for="(oneFileName,file_index) in fileNameList" :key="oneFileName" :index="oneFileName" @click.native="fileItemClick(file_index,$event)">
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
              <el-menu-item v-for="(onecaseName,case_index) in caseNameList" @click.native="caseItemClick(case_index,$event)" :index="'usecase' + case_index">
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
                <i class="el-icon-s-operation"></i>
                <span>工作流</span>
              </template>
<!--              二级菜单-->
              <el-menu-item index="/subject_identification" @click.native="subjectIdentificationClick">
                <template v-slot:title>
                  <i class="el-icon-key"></i>
                  <span>主体识别</span>
                </template>
              </el-menu-item>
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
                  <i class="el-icon-finished"></i>
                  <span>参数匹配</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/generation_flow" @click.native="generFlowClick">
                <template v-slot:title>
                  <i class="el-icon-s-claim"></i>
                  <span>脚本生成</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template v-slot:title>
                <i class="el-icon-s-tools"></i>
                <span>功能组件</span>
              </template>
              <el-menu-item index="/usecase_search" @click.native="useCaseSearchClick">
                <template v-slot:title>
                  <i class="el-icon-search"></i>
                  <span>用例搜索</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-aside width="200px">
          <use-instructions v-if="$store.state.isShowUseInstruction"></use-instructions>
          <case-data-table ref="case_data_table_ref" v-else></case-data-table>
        </el-aside>
      </el-container>
    </el-container>
</template>

<script>
import ExitBtn from "@/components/baseUtils/ExitBtn";
import { getLeftMenuItemListData,withFileNameGetUsecaseList } from "@/network/network_request";
import CaseDataTable from "@/components/baseUtils/CaseDataTable";
import UseInstructions from "@/components/baseUtils/UseInstructions";

export default {
  name: "AutomaticGenerationWorkspace",
  data(){
    return {
      fileNameList:['文件1','文件2','文件3','文件4'],
      caseNameList:['用例1','用例2','用例3','用例4'],
      caseItemList:[],
      name:'anlysqx',
      iscollapseToggle:false,
      activePath:window.sessionStorage.getItem("activePath"),
    }
  },
  created() {
    //创建时请求左边menu菜单的数据，用于展示文件列表和默认文件下的测试用例
    this.getLeftMenuList()
    //设置当前活跃路径，保存到session中，用于刷新时的记忆
    this.activePath = window.sessionStorage.getItem("activePath")
    if (!this.activePath){
      this.activePath = '/subject_identification'
      window.sessionStorage.setItem("activePath",this.activePath)
    }
  },
  methods:{
    headerClick(){
      this.$router.replace('/home')
    },
    saveActivePath(path){
      this.activePath = path
      window.sessionStorage.setItem("activePath",this.activePath)
      if (this.$store.state.toAnalysisCase.title.func_desc !== ''){
        // console.log('条件判断成功，不是空')
        this.$store.state.isShowUseInstruction = false
      }
    },
    subjectIdentificationClick(){
      this.saveActivePath('/subject_identification')
      this.$router.replace('/subject_identification')
    },
    useCaseSearchClick(){
      this.saveActivePath('/usecase_search')
      this.$router.replace('/usecase_search')
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
    //从getLeftMenuList和fileItemClick中抽取出来的共同代码
    //对请求得到的res中的caselist数据，进行统一更新操作
    fromResGetCaseItemList(res){
      this.caseItemList = res.data.message.defaultDataList.test_case
      this.caseNameList = []
      for (let item of this.caseItemList){
        let tmp_one_name = item.title.func_desc
        tmp_one_name = tmp_one_name.substr(0,4) + '...' + '测试'
        this.caseNameList.push(tmp_one_name)
      }
    },
    getLeftMenuList(){
      getLeftMenuItemListData('/leftMenuData').then(res => {
        console.log('leftmenu item data = ',res)
        this.fileNameList = res.data.message.fileList
        this.fromResGetCaseItemList(res)
      }).catch(err => {
        console.log(err)
      })
    },
    fileItemClick(file_index,event){
      console.log(event.index)
      console.log(file_index)
      this.saveActivePath(event.index)
      if (file_index === 0) return
      console.log('hello')
      withFileNameGetUsecaseList(this.fileNameList[file_index],'/newFileCaseData').then(res => {
        console.log('根据选择的文件名，请求对应的测试用例列表')
        console.log('新请求到的 usecase data list = ',res)
        ////////////////////////////
        this.fromResGetCaseItemList(res)
      }).catch(err => {
        console.log(err)
      })
    },
    caseItemClick(case_index,event){
      console.log('case_index = ',case_index)
      console.log(event.index)
      this.saveActivePath(event.index)
      let tmp_case_item = this.caseItemList[case_index]
      this.$store.state.isShowUseInstruction = false
      this.$store.state.toAnalysisCase = tmp_case_item
      this.saveActivePath('/subject_identification')
      //需要做延时处理，因为子组件不是一开始就渲染到浏览器上的
      // 要等待渲染完成，否则虽然能够执行成功但是会报错
      console.log(this.$store.state.toAnalysisCase)
      setTimeout(()=>{
        this.$refs.case_data_table_ref.changeData(this.$store.state.toAnalysisCase)
      },10)
    }
  },
  components:{
    ExitBtn,
    CaseDataTable,
    UseInstructions
  }
}
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo{
    height: 600px;
    overflow-y: auto;
  }
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
    cursor: pointer;
  }
</style>