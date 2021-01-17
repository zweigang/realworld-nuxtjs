<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
      ><img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
        >{{ article.author.username }}
      </nuxt-link>
      <span class="date"
        >{{ article.author.createdAt | date("MMMM DD") }}th</span
      >
    </div>
    <button
      class="btn btn-sm btn-outline-secondary"
      @click="onFollow(article)"
      :class="{
        active: article.author.following,
      }"
      :disabled="article.followDisabled"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Follow Eric Simons <span class="counter">({{article.followCount}})</span>
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited,
      }"
      @click="onFavorite(article)"
      :disabled="article.favoriteDisabled"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
import { 
  getProfiles,
  addFollowUser,
  deleteFollowUser
  } from "@/api/follow"
import { 
  addFavorite,
  deleteFavorite
  } from "@/api/article"
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data(){
    return {
    }
  },
  mounted() {
    
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true
      this.$emit('updateArticle',article)
      if (article.favorited) {
        //取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        //添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
      this.$emit('updateArticle',article)
    },
    async onFollow(article){
      article.followDisabled = true
      this.$emit('updateArticle',article)
      if(article.author.following){
        await deleteFollowUser(article.author.username)
        article.author.following = false
        article.followCount -= 1
      }else{
        await addFollowUser(article.author.username)
        article.author.following = true
        article.followCount += 1
      }
      article.followDisabled = false
      this.$emit('updateArticle',article)
    }
  },
};
</script>

<style>
</style>