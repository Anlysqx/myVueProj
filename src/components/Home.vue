<template>
  <div>
    <el-container>
      <el-header>
        <p>home 组件</p>
      </el-header>
      <el-main>
        <el-button type="info" @click="logoutBtnClick">退出</el-button>
        <el-button type="primary" @click="workspaceBtnClick">测试用例生成工作区</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods:{
    logoutBtnClick(){
      window.sessionStorage.clear()
      this.$router.replace('/login')
    },
    workspaceBtnClick(){
      this.$router.replace('/workspace')
    }
  }
}
</script>

<style scoped>

</style>