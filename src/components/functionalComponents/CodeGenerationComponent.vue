<template>
  <div>
    <StepBar :active="active"></StepBar>
  </div>
</template>

<script>
import StepBar from "@/components/baseUtils/StepBar";
export default {
  name: "CodeGenerationComponent",
  data(){
    return {
      active:3
    }
  },
  components:{
    StepBar
  }
}
</script>

<style scoped>

</style>