<template>
  <div>
    <el-container class="container-style">
      <el-header>
        <div @click="headerClick">
            <img class="header-left-style" src="../assets/good1.jpeg" alt="">
            <span>运行结果分析与闭环反馈</span>
        </div>
        <exit-btn></exit-btn>
      </el-header>
      <el-main>
        <h2>运行结果分析与闭环反馈</h2>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ExitBtn from "@/components/baseUtils/ExitBtn";
export default {
  name: "ResultAnalysisAndTreatment",
  data(){

  },
  methods:{
    headerClick(){
      this.$router.replace('/home')
    }
  },
  components:{
    ExitBtn
  }
}
</script>

<style lang="less" scoped>
  .header-left-style{
    width: 4.7%;
    height: 3%;
    border-radius: 50%;
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
</style>