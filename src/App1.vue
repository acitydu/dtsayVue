<template>
  <div id="">
    <img class="logo" src="./assets/logo.png">
    <hello></hello>
    <p>
      Welcome to your Vue.js app!
    </p>
    <a v-link="{ name: 'articlelist' }">gfgfgf</a>
    
  </div>
  
</template>

<script>
import Hello from './components/Hello'

export default {
  components: {
    Hello
  },
   data() {
      return {
        selected: '喆理'
      };
    }
}
</script>

<style>

#app {
  font-family: "微软雅黑";
}

.logo {
  width: 100px;
  height: 100px;
}
</style>
