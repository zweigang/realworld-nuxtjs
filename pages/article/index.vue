<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <articleMeta 
        v-if="article" 
        :article="article"
        @updateArticle="updateArticle"
        />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>
      </div>

      <hr />

      <div class="article-actions">
        <articleMeta 
        v-if="article" 
        :article="article"
        @updateArticle="updateArticle"
        />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import articleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'
import { 
  getProfiles
  } from "@/api/follow"
export default {
  name: 'ArticleIndex',
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const profileRes = await getProfiles(article.author.username)
    const { profile } = profileRes.data
    article.followCount = profile.following ? 1: 0
    article.followDisabled = false
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    article.favoriteDisabled = false
    return {
      article
    }
  },
  components:{
    articleMeta,
    ArticleComments
  },
  head() {
      return {
        title: `${this.article.title} - RealWorld`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${this.article.description}`
          }
        ]
      }
  },
  methods:{
    updateArticle(article){
      this.article = article
    }
  }
};
</script>

<style>
</style>