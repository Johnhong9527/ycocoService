<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button type="button" name="button" @click='btnTest'>检测登录信息</button>
    <router-view/>
  </div>
</template>

<script>
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
