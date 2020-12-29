<template>
    <div id="nav">
      <el-row type="flex" class="row-bg" justify="space-between" align="middle">
        <el-col :span="13">
          <div class="grid-content bg-purple">
            <el-menu class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1"><a href="index.html" style="text-decoration:none;font-size:30px;font-weight:900;">ojp</a></el-menu-item>
            <el-menu-item index="2"><a href="#">探索</a></el-menu-item>
            <el-menu-item index="3"><a href="problemList.html">题库</a></el-menu-item>
            <el-menu-item index="4"><a href="#">讨论</a></el-menu-item>
            <el-menu-item index="5"><a href="#">竞赛</a></el-menu-item>
            <el-menu-item index="6"><a href="#">企业</a></el-menu-item>
            <el-submenu index="7">
              <template slot="title">商品</template>
              <el-menu-item index="7-1">精品商城</el-menu-item>
              <el-menu-item index="7-2">力扣周边</el-menu-item>
              <el-menu-item index="7-3">Plus会员</el-menu-item>
            </el-submenu>
            <div class="line"></div>
        </el-menu>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple-light">

          </div>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6"><el-button type="success" plain size="mini"> <span class="iconfont icon-PhoneMobile"></span> 下载App</el-button></el-col>
            <el-col :span="6"><el-button type="warning" plain size="mini">Plus会员</el-button></el-col>
            <el-col :span="3">
              <div class="n_right">
                <el-tooltip class="item" effect="dark" content="新建Playground" placement="bottom">
                  <span class="iconfont icon-xinjianmenhu"></span>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="3"><div class="n_right"><span class="iconfont icon-lingdang"></span></div></el-col>
            <el-col :span="3"><div class="avater"><img src="../assets/images/logo.png" alt=""></div></el-col>
            <el-col :span="1"><el-button type="primary" class="n_right" size='mini' @click="logout">注销</el-button></el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import '../assets/font/iconfont.css'
export default {
  name: 'navbar',
  data () {
    return {
      
    }
  },
  methods: {
    async logout(){
      const {data:res} = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/user/logout')
      console.log(res)
      if(res.code!= 0) this.$message.warning('用户注销失败')
      this.$message.success('用户注销成功')
      location.href = 'http://localhost:8080/login.html#/'
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  #nav{
    padding: 5px 0;
    margin-bottom: 30px;
    .el-menu.el-menu--horizontal {
       border-bottom: 0;
    }
    .el-row--flex.is-align-middle{
      height: 30px;
    }
    img{
      height: 30px;
      width: 90px;
    }
    span{
      font-size: 13.6px;
    }
    .avater{
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #000;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .n_right span{
      font-size: 20px;
      font-weight: bold;
      color: #999;
      cursor: pointer;
    }
  }
</style>
