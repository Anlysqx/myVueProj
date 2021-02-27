<template>
  <div class="use-instruction-style">
    <el-collapse>
      <el-row class="right-title-style">
        <span>
          使用说明
          <i class="el-icon-info"></i>
        </span>
      </el-row>
      <el-collapse-item name="2">
        <template v-slot:title>
          <span class="span_title_style">测试文件选取</span>
        </template>
        <div class="title_div">
          <div>
            <span>功能描述:</span>
            <div class="content_style">
              选择左边menu菜单栏中的测试文件，一个测试文件是对一个专门系统或部件的测试 <br>
              选择完测试文件后，对应的测试用例也随之发生改变
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template v-slot:title>
          <span class="span_title_style">测试用例</span>
        </template>
        <div class="title_div">
          <div>
            <span>功能描述:</span>
            <div class="content_style">
              选择左边menu菜单栏中的一个测试用例，用于进行测试运行 <br>
              测试用例为模型测试数据
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template v-slot:title>
          <span class="span_title_style">自定义用例</span>
        </template>
        <div class="title_div">
          <div>
            <span>功能描述:</span>
            <div class="content_style">
              用户自定义一个新测试用例，可用于现场测试
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="5">
        <template v-slot:title>
          <span class="span_title_style">功能组件</span>
        </template>
        <div class="title_div">
          <div>
            <span>用例搜索功能:</span>
            <div class="content_style">
              可以根据现有用例的测试功能描述，输入参数，判读参数 <br>
              基于匹配项数目和各项语义相似度分数去测试用例数据库中检索出与之最匹配的历史测试用例
              并对检索结果进行排序
            </div>
          </div>
        </div>
        <div class="title_div">
          <div>
            <span>分类功能描述:</span>
            <div class="content_style">
              根据输入的每一步骤，分类到该步骤对应的指令类型，<br>
              输入类型：自然语言文本;<br>
              输出类型：指令类别[SETP,GETVALUE,WAIT] <br>
              可自主选择相应的算法模型
            </div>
          </div>
        </div>
        <div class="title_div">
          <div>
            <span>信息抽取:</span>
            <div class="content_style">
              根据输入的自然语言文本信息，按照指令分类的结果，得到相应的指令语法草图
              不同的指令语法草图不同，要提取的信息数目也各不相同 <br>
              输入：自然语言文本，指令类别 <br>
              输出：抽取部件名称，参数名称，参数值
            </div>
          </div>
        </div>
        <div class="title_div">
          <div>
            <span>代码生成:</span>
            <div class="content_style">
              根据分类和信息抽取的结果，将参数和参数值进行绑定，填入对应指令的语法草图中 <br>
              输入：自然语言文本，指令类别，信息抽取结果 <br>
              输出：该步骤对应的脚本代码
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="6">
        <template v-slot:title>
          <span class="span_title_style">工作流</span>
        </template>
        <div class="title_div">
          <div>
            <span>功能描述:</span>
            <div class="content_style">
              以工作流的方式完整地对一个测试用例进行自动化地测试脚本生成，
              分别经过 <br>
              指令步骤分类 <br>
              步骤信息抽取 <br>
              参数识别与绑定 <br>
              代码生成与合并 <br>
              测试脚本代码生成 <br>
              测试人员监督 等过程
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    name: "UseInstructions"
  }
</script>

<style lang="less" scoped>
  .right-title-style{
    margin: 5px;
    padding: 5px;
    text-align: center;
    display: flex;
    span{
      margin-left: 50%;
      transform: translate(-50%);
    }
  }
  .use-instruction-style{
    height: 600px;
    overflow-y: auto;
  }
  .content_style{
    background-color: #d0d0d0;
    padding: 5%;
    color: #273865;
  }
  .title_div{
    padding: 5%;
    span{
      font-weight: bold;
      color: #273865;
    }
  }
  .span_title_style{
    color: #273865;
    font-weight: bolder;
    margin-left: 24%;
    transform: translate(-50%);
  }
</style>