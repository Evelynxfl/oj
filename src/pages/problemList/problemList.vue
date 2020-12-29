<template>
  <div class="problemList">
    <navbar></navbar>
    <div class="content">
      <el-row :gutter="40" type="flex" justify="center">
        <el-col :span="18"><div class="grid-content bg-purple">
          <cetagoryCards></cetagoryCards>
          <problem></problem>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <cebianlan></cebianlan>  
        </div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import navbar from '../../components/navBar.vue'
import cetagoryCards from '../../modules/cetagoryCard.vue'
import '../../assets/font/iconfont.css'
import problem from '../../modules/problem.vue'
import cebianlan from '../../modules/cebianlan.vue'
export default {
  name: 'problemList',
  components:{
    navbar,
    cetagoryCards,
    problem,
    cebianlan
  }
}
</script>

<style lang="less" scoped>
  .problemList{
      width: 1170px;
      min-width: 930px;
      margin: 0 auto;
      .content{
        margin-top: 20px;
      }
    }
</style>
