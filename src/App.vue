<template>
  <div id="app">
    <router-view v-if="isRouterAlive" class="view"></router-view>
  </div>
</template>
 
<script>
import Vue from 'vue'
 
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload,
    }
  },
  data(){
    return {
      isRouterAlive: true
    }
  },
  mounted () {
    
  },
  methods: {
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(()=>{
        this.isRouterAlive = true;
      })
    }
  }
}
</script>
 
<style lang="less" scoped>
#app{
    width: 100%;
    height: 100%;
}
</style>




