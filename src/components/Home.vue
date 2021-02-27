<template>
  <div>
    <el-container class="container-style">
      <el-header>
        <div>
            <img class="header-left-style" src="../assets/good1.jpeg" alt="">
            <span>航天器测试脚本自动生成系统</span>
        </div>
        <exit-btn></exit-btn>
      </el-header>
      <el-main>
        <el-row type="flex" justify="center" class="home-nav-style">
          <el-col :span="4">
            <el-button type="primary" @click="workspaceBtnClick">测试用例生成工作区</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="success" @click="workspaceBtnClick">测试用例生成工作区</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="info" @click="workspaceBtnClick">测试用例生成工作区</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="warning" @click="workspaceBtnClick">测试用例生成工作区</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ExitBtn from "@/components/baseUtils/ExitBtn";
export default {
  name: "Home",
  methods:{
    workspaceBtnClick(){
      this.$router.push('/workspace')
    }
  },
  components:{
    ExitBtn
  }
}
</script>

<style lang="less" scoped>
  .home-nav-style{
    margin-top: 11%;
  }
  .header-left-style{
    width: 5%;
    height: 3%;
    border-radius: 50%;
  }
  .container-style{
    height: 100%;
    overflow-y: hidden;
  }
  .el-header {
    background-color: #273865;
    color: white;
    border-radius: 2px;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    font-size: 20px;

    > div {
      display: flex;
      align-items: center;

      span {
        margin-left: 15px;
      }
    }
  }
</style>