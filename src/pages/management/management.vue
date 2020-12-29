<template>
   <div class="layout-container">
        <el-container class="layout-container">
        <el-header>
            <a href="../index/index.html">ojp</a>
            <div class="wrap">
                <i class="avatar">
                    <img src="../../assets/images/logo.png" alt="">
                </i>
                <p>admin</p>
            </div>
            <el-button size="mini" @click="logout">退出</el-button>
        </el-header>
        <el-container class="layout-container">
            <el-aside width="200px">
                <el-menu
                    :default-active="this.$route.path"
                    class="el-menu-vertical-demo"
                    background-color="rgb(29, 78, 94)"
                    text-color="#fff"
                    active-text-color="#fff"
                    router>
                    <el-menu-item index="/add">
                        <i class="el-icon-setting"></i>
                        <span slot="title">题库管理</span>
                    </el-menu-item>
                    <el-menu-item index="/test">
                        <i class="el-icon-coin"></i>
                        <span slot="title">测试用例管理</span>
                    </el-menu-item>
                    <el-menu-item index="/language">
                        <i class="el-icon-chat-dot-round"></i>
                        <span slot="title">语言管理</span>
                    </el-menu-item>
                    <el-menu-item index="/user">
                        <i class="el-icon-user"></i>
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <!-- 主题内容 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    <!-- 修改题目 -->
    
   </div>
</template>

<script>
import navbar from '../../components/navBar.vue'
import add from '../../components/add.vue'

export default {
    data() {
        return {
            
        }
    },
    methods: {
        logout(){
            window.sessionStorage.clear()
            location.href = 'http://localhost:8080/login.html#/'
        }
    },
}
</script>

<style lang="less" scoped>

.el-header {
    background-color: rgb(119, 123, 185);
    color: #fff;
    a{
        display: inline-block;
        text-decoration: none;
        color: #fff;
        width: 160px;
        text-align: center;
        height: 100%;
        line-height: 60px;
        font-size: 28px;
        font-weight: bolder;
       
    }
    .wrap{
      display: inline-block;
      position: absolute;
      right: 120px;
      margin-top: 2px; 
      text-align: center;
      .avatar{
            height: 30px;
            width: 90px;
            
            img{
                height: 30px;
                width: 30px; 
                border-radius: 50%;

            }
        }
    }
    .el-button{
        position: absolute;
        right: 30px;
        top: 16px;
        
    }
    
}
.layout-container{
    height: 100%;
}
.el-aside{
    height: 100%;
    background-color: rgb(29, 78, 94);
    color:#fff;
}
.el-menu-item:hover {
  background-color: rgb(153, 154, 155) !important;

}
.el-main{
    height: 100%;
    .search{
        padding-bottom: 20px;
    }
    .el-header {
        background-color: rgb(119, 123, 185);
        color: #fff;
        text-align: center;
        font-size: 30px;
        font-weight: 900;
        line-height: 60px;
    }
}

</style>