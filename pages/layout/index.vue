<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link 
            class="nav-link" 
            to="/"
            exact
            >Home</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link 
              class="nav-link" 
              to="/editor"
              exact
              >
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link 
              class="nav-link" 
              to="/settings"
              exact
              >
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link 
              class="nav-link" 
              to="/profile/123"
              exact
              >
              <img v-if="user.image" class="user-pic" :src="user.image">
              {{user.username}}
              </nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link 
              class="nav-link" 
              to="/login"
              exact
              >Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link 
              class="nav-link" 
              to="/register"
              exact
              >Sign up</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <!-- /顶部导航栏 -->

    <!-- 子路由 -->
    <nuxt-child/>
    <!-- /子路由 -->

    <!-- 底部 -->
    <footer>
      <div class="container">
        <nuxt-link to="/" class="logo-font">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
    <!-- /底部 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'LayoutIndex',
    computed:{
      ...mapState(['user'])
    }
};
</script>

<style>
</style>