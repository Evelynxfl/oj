<template>
    <div class="wrap">
        <el-card class="box-card">
        <h2>用户登录</h2>
        <el-form :model="user" :rules="loginFormRules" ref="loginForm" label-width="0px" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input v-model="user.username" placeholder="账号">
              <i slot="prepend" class="el-icon-s-custom"/>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="user.password">
              <i slot="prepend" class="el-icon-lock"/>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row :span="24">
              <el-col :span="12">
                <el-input v-model="code" auto-complete="off" placeholder="请输入验证码" size=""></el-input>
              </el-col>
              <el-col :span="12">
                <img  @click="refreshCode" :src='imgSrc' alt="" title="看不清，换一张" style="cursor:pointer;">
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="formLogin">登录</el-button>
            <el-button type="primary" @click="resetLoginForm">重置</el-button>
          </div>
          </el-form-item>
            <router-link to="/register">
                 <p style="font-size:12px;line-height:30px;color:#999999;">还没有账号？快速注册</p>
            </router-link>
          </el-form>
       </el-card>
    </div>
</template>

<script>
export default {
    name: 'login',
  data() {
    return {
      user:{
        username:'xfl123',
        password:'xfl12345',
      },
      refreCodeId:'',
      code:'',
      imgSrc:'http://gnibra7h.dongtaiyuming.net:11770/user/getCodeImage?id=',
      loginFormRules:{
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/, message: '密码必须同时包含数字与字母,且长度为 6-20位' }
        ],
      }
    }
  },
  created() {
    this.refreshCode ()
  },
  methods: {
    //重置表单
    resetLoginForm(){
      this.$refs.loginForm.resetFields()
    },
    //登录
    formLogin(){
      console.log();
      this.$refs.loginForm.validate(async valid => {
        console.log(valid);
        if( !valid) return
        if(this.code == '') return this.$message.warning('验证码不能为空');
        const {data:res} = await this.$http.post('http://gnibra7h.dongtaiyuming.net:11770/user/login?inputCode='+this.code,this.user)
        console.log(res);
        if(res.code != 0) return this.$message.error(res.msg) 
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token',res.token)
        //  this.$router.push({ path: '' })
        if(res.user.rolesList[0].name != "admin"){
          location.href = 'http://localhost:8080/problemList.html'
        }else{
           location.href = ' http://localhost:8080/management.html#/'
          // return this.$message.error('请重新登录')
         
        }
      })
  
    },
    //点击图片刷新验证码图片
    refreshCode () {
      this.refreCodeId = Math.floor(Math.random()*10)
      console.log(this.refreCodeId);
      this.imgSrc = this.imgSrc+this.refreCodeId
      console.log(this.imgSrc);
    },
  },
}
</script>

<style lang="less" scoped>
.wrap{
    text-align: center;
    h2{
      padding-bottom: 20px;
    }
    .contain{
      margin-left: -50px;
    }
}
</style>