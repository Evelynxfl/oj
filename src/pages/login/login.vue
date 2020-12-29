<template>
  <div class="bg">
    <div class="title">
      <p>Online Judge系统</p>
    </div>
    <div class="form">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
  .bg{
    height: 100%;
    background: url('../../assets/images/bg.jpg');
    background-size: 100% 100%;
    .title{
      height: 200px;
      width: 100%;
      background:rgba(255,255,255,0.5);
      position: relative;
      top: 50%; /*偏移*/
      transform: translateY(-50%);
      p{
        // color: #fff;
        font-weight: 900;
        font-size: 60px;
        line-height: 200px;
        padding-left: 90px;
      }
    }
    .form{
      width: 400px;
      height: auto;
      position:absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 150px;
    }
  }
 
</style>