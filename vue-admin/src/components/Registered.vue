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
    <div class="">
      <label>newPassword</label>
      <input type="password" name="password" placeholder="请设置新的登录密码" v-model="newPassword">
    </div>
    <button type="button" name="button" @click='signUpBtn'>注册</button>
    <button type="button" name="button" @click='signInBtn'>登录</button>
    <button type="button" name="button" @click='signOutBtn'>登出</button>
    <button type="button" name="button" @click='updateBtn'>修改</button>
    <button type="button" name="button" @click='deleteBtn'>删除</button>
    <hr>
    <h4>cookie</h4>
    <div class="cookie">
      <button type="button" name="button" @click='cookieAddBtn'>addCookie</button>
      <button type="button" name="button" @click='cookieRemoveBtn'>removeCookie</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Registered',
  data(){
    return {
      userName:null,
      password:null,
      newPassword:null
    }
  },
  created(){
    this.cookieAddBtn();
  },
  methods:{
    // 登入
    signInBtn:function () {
      if(!(this.password === null || this.password.length <= 0)){
        axios.post('/users/sign-in',{
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
        console.log(!(this.password === null || this.password.length <= 0));
        alert('登录信息不为空');
      }
    },
    // 注册
    signUpBtn: function () {
      if(!(this.password === null || this.password.length <= 0)){
        axios.post('/users/sign-up',{
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
    signOutBtn: function () {
      axios.post('/users/sign-out').then(res=>{
        console.log(res)
      })
    },
    // 更新数据
    updateBtn: function () {
      if(!(this.password === null || this.password.length <= 0 || this.newPassword === null)){
        axios.post('/users/update',{
          name:this.userName,
          password:this.password,
          newPassword: this.newPassword
        }).then(res=>{
          console.log(res);
          if(res.data === 1){
            alert('修改成功');
          } else {
            alert(res.data);
          }
        })
      }
    },
    // 删除用户数据
    deleteBtn:function (){
      if(!(this.password === null || this.password.length <= 0)){
        axios.post('/users/delete-user',{
          name:this.userName,
          password:this.password
        }).then(res=>{
          console.log(res);
          if(res.data === 1){
            alert('删除成功');
          } else {
            alert(res.data);
          }
        })
      }
    },
    cookieAddBtn: function(){
      axios.get('/api').then(res=>{
        console.log(res);
      })
    },
    cookieRemoveBtn: function () {
      axios.get('/api/hello').then(res=>{
        console.log(res);
      })
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
