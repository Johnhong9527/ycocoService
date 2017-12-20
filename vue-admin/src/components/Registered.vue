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
    <button type="button" name="button" @click='signUpBtn'>注册</button>
    <button type="button" name="button" @click='signInBtn'>登录</button>
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
  created(){},
  methods:{
    // 登入
    signInBtn:function () {
      if(!(this.password === null || this.password.length <= 0)){
        axios.post('http://127.0.0.1:3000/users/sign-in',{
          name:this.userName,
          password:this.password
        }).then(res =>{
          console.log(res)
          if(res.data.ok === 1){
            alert('登录成功！')
          } else  {
            alert(res.data)
          }
        })
      } else {
        alert('登录信息不为空')
      }
    },
    // 注册
    signUpBtn: function () {
      if(!(this.password === null || this.password.length <= 0)){
        axios.post('http://127.0.0.1:3000/users/sign-up',{
          name:this.userName,
          password:this.password
        }).then(res =>{
          if(res.data.ok === 1){
            alert('注册成功！')
          } else  {
            alert(res.data)
          }
        })
      } else {
        alert('注册信息不为空')
      }
    },
    // Update
    updateBtn: function () {

    }
  }
}
</script>

<style lang="less">
.box{
  margin: 0 auto;
  width: 50vw;
  label{
    font-size: 2rem;
    display: block;
    margin: 0 auto;
    width: 100%;
    line-height: 30px;
    background-color: #ddd;
  }
}
</style>
