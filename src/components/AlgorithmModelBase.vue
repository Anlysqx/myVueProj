<template>
  <div>
    <el-container class="container-style">
      <el-header>
        <div @click="headerClick">
            <img class="header-left-style" src="../assets/good1.jpeg" alt="">
            <span>算法模型库</span>
        </div>
        <exit-btn></exit-btn>
      </el-header>
      <el-main>
        <h2>算法模型库</h2>
        <div style="width: 600px;display: flex">
          <GraphTopology></GraphTopology>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ExitBtn from "@/components/baseUtils/ExitBtn";
import GraphTopology from "@/components/baseUtils/GraphTopology";
export default {
  name: "AlgorithmModelBase",
  data(){

  },
  methods:{
    headerClick(){
      this.$router.replace('/home')
    }
  },
  components:{
    ExitBtn,GraphTopology
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