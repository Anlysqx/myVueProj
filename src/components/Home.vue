<template>
  <div>
    <el-container>
      <el-header>
        <p>home 组件</p>
      </el-header>
      <el-main>
        <exit-btn></exit-btn>
        <el-button type="primary" @click="workspaceBtnClick">测试用例生成工作区</el-button>
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

<style scoped>

</style>