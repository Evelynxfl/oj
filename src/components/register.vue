<template>
   <div class="wrap">
        <el-card class="box-card">
        <h2>用户注册</h2>
        <el-form :model="user" :rules="registerFormRules" ref="registerinForm" label-width="0px" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input v-model="user.username" placeholder="账号">
              <i slot="prepend" class="el-icon-s-custom"/>
            </el-input>
          </el-form-item>
          <el-form-item prop='email' class="email">
            <el-input v-model="user.email" placeholder="邮箱">
              <i slot="prepend" class="el-icon-message"/>
            </el-input>
            <span class="status">{{ statusMsg }}</span>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="user.password">
              <i slot="prepend" class="el-icon-lock"/>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-select class="select" v-model="language.languageName" placeholder="选择语言" 
                    @change="getSelectId(language.languageName)">
                <el-option
                    v-for="item in language"
                    :key="item.languageId"
                    :label="item.languageName"
                    :value="item.languageId">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="code">
            <el-row :span="24" :gutter="10">
              <el-col :span="14">
                <el-input v-model="code" auto-complete="off" placeholder="请输入验证码" size=""></el-input>
              </el-col>
              <el-col :span="8">
                <el-button :disabled="isDisable" @click="getEmailCode">{{time}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="register">注册</el-button>
            <el-button type="primary" @click="resetRegisterForm">重置</el-button>
          </div>
          </el-form-item>
            <router-link to="/login">
                 <p style="font-size:12px;line-height:30px;color:#999999;">已有账号？</p>
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
        username:'xcj123',
        password:'xcj12345',
        email:'2950389548@qq.com',
        languageId:'1',
      },
      language:[],
      languageId:"",
      statusMsg:'',
      time:'发送验证码',
      code:'',
      isDisable:false,
      registerFormRules:{
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_-]{6,16}$/,message: '账户名必须为6-16位的字母、数字'}],
        password: [
          { required: true, message: '请输密码', trigger: 'blur' },
           { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/, message: '密码必须同时包含数字与字母,且长度为 6-20位' }],
        email: [{
          required: true,
          message: '邮箱不能为空',
          trigger: 'blur'
        }, 
        { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确' }]
      }
    }
  },
  created() {
    this.getLanguage()
  },
  
  methods: {
    //重置表单
    resetRegisterForm(){
      this.$refs.registerinForm.resetFields()
    },
    // 点击获取邮箱验证码
    getEmailCode(){
      let count=60
      let timerid
      let self = this
      this.$refs.registerinForm.validate(async valid =>{
            console.log(valid)
            if(!valid) return
            // 发起用户信息请求
            const {data:res} = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/user/sendCodeByMail',{
              params:{
                mail:this.user.email
              }
            })
            console.log(res)
            if (res.code != 0) return this.statusMsg='验证码发送失败'
            this.statusMsg='验证码发送成功'
            this.isDisable = true
            timerid = window.setInterval(function() {
            self.time = `${count--}秒后重新发送`
            if (count <= 0) {
              console.log('clear' + timerid)
              window.clearInterval(timerid)
              self.isDisable = false
              self.statusMsg = ''
              self.time='重新发送'
            }
          }, 1000)
        })
    },
    
    register(){
      this.$refs.registerinForm.validate(async valid =>{
        if(!valid) return
        if(this.code == '') return this.$message.warning('验证码不能为空');
        const {data:res} = await this.$http.post('http://gnibra7h.dongtaiyuming.net:11770/user/registered?inputCode='+this.code,{
           username:this.user.username,
           email:this.user.email,
           password:this.user.password,
           languageId:this.user.languageId
        })
        console.log(this.user);
          console.log(res);
          if(res.code != 0) return this.$message.error(res.msg)
          this.$message.success("注册成功")
      })
    },
    async getLanguage(){
           const { data: res } = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/language/showList')
           if (res.msg != "success") return this.$message.error('题目列表加载失败')
           this.language = res.data
          //  console.log( res.data)
      },
    getSelectId(val){
            this.user.languageId = val
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
    .email{
      line-height: 0;
      text-align: left;
    }
    .status {
      font-size: 12px;
      // margin-left: 20px;
      color: #e6a23c;
     
    }
}
</style>