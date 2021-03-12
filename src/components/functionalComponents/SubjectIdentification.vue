<template>
  <div>
    <StepBar :active="active"></StepBar>
  </div>
</template>

<script>
import StepBar from "@/components/baseUtils/StepBar";

  export default {
    name: "SubjectIdentification",
    data(){
      return {
        active:0
      }
    },
    methods:{

    },
    components:{
      StepBar
    }
  }
</script>

<style lang="less" scoped>

</style>