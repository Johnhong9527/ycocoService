<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button type="button" name="button" @click='btnTest'>检测登录信息</button>
    <hr>
    <button class="" @click='btnCommunication'>通信</button>
    <router-view/>

  </div>
</template>

<script>
import bus from '@/assets/bus'
import {users} from './util'
import axios from 'axios'
import _ from '@/config'
export default {
  name: 'app',
  created(){},
  methods:{
    btnTest: function () {
      users(res=>{
        console.log(res);
      })
    },
    btnCommunication: function(){
      bus.$emit('id-selected',1);
      this.$router.push({path:'/Registered'})
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
