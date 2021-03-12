<template>
  <div>
    <StepBar :active="active"></StepBar>
  </div>
</template>

<script>
import StepBar from "@/components/baseUtils/StepBar";
export default {
  name: "ClassifyComponent",
  data(){
    return {active:1}
  },
  components:{
    StepBar
  }
}
</script>

<style scoped>

</style>