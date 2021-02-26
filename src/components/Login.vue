<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/small.jpg" alt="">
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="账号/用户名/邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item class="login_btn">
          <el-button type="primary" @click="loginBtnClick">登录</el-button>
          <el-button type="info" @click="registerBtnClick">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {loginRequest} from '../network/network_request'
export default {
  name: "Login",
  data(){
    return {
      loginForm:{
        username:'',
        password:''
      },
      loginFormRules:{
        username:[
          {required:true,message:'请输入合法用户名',trigger:'blur'},
          {min:5,max:20,message: '长度在5-20之间',trigger: 'blur'}
        ],
        password: [
          {required:true,message:'请输入密码',trigger:'blur'},
          {min:5,max:20,message: '长度在5-20之间',trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    loginSuccess(){
      this.$message({
          message: '登陆成功',
          type: 'success'
        });
    },
    loginFail(){
      this.$message.error('用户名或密码错误');
    },
    loginBtnClick(){
      this.$refs.loginFormRef.validate(valid => {
        if (valid){
          const formData = this.loginForm
          loginRequest('/login',formData).then(res =>{
            if (res.data.code === 200){
              const sessionToken = res.data.data.token
              window.sessionStorage.setItem("token",sessionToken)
              this.loginSuccess()
              this.$router.replace('/home')
            }else{
              this.loginFail()
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    registerBtnClick(){
      console.log('register')
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.avatar_box{
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.login_btn{
  display: flex;
  justify-content: flex-end;
}
</style>