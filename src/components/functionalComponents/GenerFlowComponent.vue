<template>
  <div>
    <StepBar :active="active"></StepBar>
  </div>
</template>

<script>
import StepBar from "@/components/baseUtils/StepBar";
export default {
  name: "GenerFlowComponent",
  data(){
    return {
      active:4
    }
  },
  components:{
    StepBar
  }
}
</script>

<style scoped>

</style>