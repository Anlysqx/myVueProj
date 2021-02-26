<template>
  <div>
    <el-button type="info" @click="logoutBtnClick">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "ExitBtn",
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