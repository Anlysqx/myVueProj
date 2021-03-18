<template>
  <div class="pair-match-whole">
    <div>
      <el-table
      :data="pair_match_data"
      height="250"
      border
      stripe
      style="width: 100%">
        <el-table-column
          prop="param"
          label="参数名称">
        </el-table-column>
        <el-table-column
          prop="value"
          label="参数值"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="pair"
          label="候选匹配pair对"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PairMatchTable",
    props:{
      pair_match_data:{
        default(){
          return [
              {"param":"温度阈值上限","value":"t1","pair":["温度阈值上限","t1"]},
              {"param":"光照状态","value":"阴影区","pair":["光照状态","阴影区"]}
              ]
        }
      }
    },
    data(){
      return {}
    },
    methods:{

    }
  }
</script>

<style lang="less" scoped>
  .pair-match-whole{
    height: 100%;
  }
</style>