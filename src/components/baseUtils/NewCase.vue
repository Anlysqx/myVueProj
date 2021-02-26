<template>
  <div>
<!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>自定义用例</el-breadcrumb-item>
      <el-breadcrumb-item>添加</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片区域-->
    <el-card>
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "NewCase"
}
</script>

<style lang="less" scoped>

</style>