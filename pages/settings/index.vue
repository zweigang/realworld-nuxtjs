<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row" v-if="user">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <ul class="error-messages">
          <template v-for="(messages,field) in errors">
            <li v-for="(message,index) in messages" :key="index">
              {{ field }} {{message}}
            </li>
          </template>
          
        </ul>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="user.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="user.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="user.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="user.password"
                />
              </fieldset>
              <button 
              class="btn btn-lg btn-primary pull-xs-right"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  getUser,
  updateUser
   } from '@/api/user'
export default {
    name: 'SettingsIndex',
    middleware: 'authenticated',
    data(){
      return {
        user:null,
        errors:{}
      }
    },
    mounted(){
      getUser().then(res=>{
        let { data } = res
        let { user } = data
        this.user = user
      })
    },
    methods:{
      onSubmit(){
        if(!this.checkUser(this.user)){
          return false;
        }
        try {
        updateUser({
          user:this.user
        }).then(res=>{
          alert('更新成功！')
        })
        } catch (err) {
          this.errors = err.response.data.errors;
        }
      },
      checkUser(user){
        user.image = user.image || '';
        user.username = user.username || '';
        user.bio = user.bio || '';
        user.email = user.email || '';
        user.password = user.password || '';

        user.image = user.image.trim();
        user.username = user.username.trim();
        user.bio = user.bio.trim();
        user.email = user.email.trim();
        user.password = user.password.trim();

        if(user.image.length===0){
          alert("Please input profile picture");
          return false;
        }
        if(user.username.length===0){
          alert("Please input your name");
          return false;
        }
        if(user.bio.length===0){
          alert("Please input bio");
          return false;
        }
        if(user.email.length===0){
          alert("Please input email");
          return false;
        }
        if(user.password.length===0){
          alert("Please input password");
          return false;
        }
        return true;
      }
    }
};
</script>

<style>
</style>