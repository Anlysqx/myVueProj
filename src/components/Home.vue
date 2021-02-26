<template>
  <div>
    <h2>home组件</h2>
    <el-button type="info" @click="logoutBtnClick">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods:{
    logoutBtnClick(){
      window.sessionStorage.clear()
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>

</style>