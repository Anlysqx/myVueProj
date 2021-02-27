<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/workspace' }">工作台</el-breadcrumb-item>
      <el-breadcrumb-item>指令分类</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "ClassifyComponent"
}
</script>

<style scoped>

</style>