<template lang="html">
  <div class="box">
    <div class="">
      <label>name</label>
      <input type="text" name="userName" placeholder="请输入您的姓名" v-model.trim="userName">
    </div>
    <div class="">
      <label>password</label>
      <input type="password" name="password" placeholder="请设置您的登录密码" v-model="password">
    </div>
    <button type="button" name="button" @click='btn'>注册</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Registered',
  data(){
    return {
      userName:null,
      password:null
    }
  },
  created(){
    // axios.get('http://127.0.0.1:3000/users/insert').then(res =>{
    //   console.log(res);
    // })
  },
  methods:{
    btn:function () {
      axios.post('http://127.0.0.1:3000/users/insert',
      {
        name:this.userName,
        password:this.password
      }).then(res =>{
        console.log(res);
      })
      // console.log(this.userName);
      // console.log(this.password);
    }
  }
}
</script>

<style lang="less">
.box{
  label{
    font-size: 2rem;
    display: block;
    margin: 0 auto;
    width: 150px;
    line-height: 30px;
    background-color: #ddd;
  }
}
</style>
