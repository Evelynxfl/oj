<template>
  <div class="container">
    <navbar class="nav"></navbar>
    
  </div>
</template>

<script>
import navbar from '../../components/navBar.vue'
export default {
  name: 'app',
  components:{
    navbar
  }
}
</script>

<style lang="less" scoped>
  .container{
     border-bottom: 1px solid #eee;
     height: 50px;
    .nav{
      width: 1170px;
      min-width: 930px;
      margin: 0 auto;
    }
  }
</style>
