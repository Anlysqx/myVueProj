<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/workspace' }">工作台</el-breadcrumb-item>
      <el-breadcrumb-item>用例搜索</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片视图区-->
    <el-card>
      <div style="margin-top: 15px">
        <el-input
          placeholder="请输入内容"
          v-model="input3"
          class="input-with-select"
        >
          <template #prepend>
            <el-select v-model="select" placeholder="请选择">
              <el-option label="功能描述" value="1"></el-option>
              <el-option label="输入参数" value="2"></el-option>
              <el-option label="判读参数" value="3"></el-option>
            </el-select>
          </template>
          <template #append>
            <el-button icon="el-icon-search" @click="searchBtnClick"></el-button>
          </template>
        </el-input>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "UseCaseSearch",
    data(){
      return {
        select:'',
        input3:''
      }
    },
    methods:{
      searchBtnClick(){
        console.log('search btn click')
      }
    }
  }
</script>

<style lang="less" scoped>

</style>