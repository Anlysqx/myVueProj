<template>
  <div>
    <el-steps :active="data_active" finish-status="success" >
      <el-step @click="stepClick('/subject_identification')" title="主体识别"></el-step>
      <el-step @click="stepClick('/info_classify')" title="指令分类"></el-step>
      <el-step @click="stepClick('/info_extraction')" title="信息抽取"></el-step>
      <el-step @click="stepClick('/code_generation')" title="参数匹配"></el-step>
      <el-step @click="stepClick('/generation_flow')" title="脚本生成"></el-step>
    </el-steps>
  </div>
</template>

<script>
  export default {
    name: "StepBar",
    props:{
      active:{
        type:Number,
        default:0
      }
    },
    data(){
      return {
        data_active:this.active
      }
    },
    methods:{
      stepClick(path){
        window.sessionStorage.setItem("activePath",path)
        this.$router.replace(path)
      }
    }
  }
</script>

<style scoped>

</style>