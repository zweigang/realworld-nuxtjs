<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                  required
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="publishArticle"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from "@/api/article";

export default {
  name: "EditorIndex",
  // 在路由匹配之前会先渲染中间件
  middleware: "authenticated",
  data() {
    return {
      tags:'',
      article: {
        title: "ttt",
        description: "ttt",
        body: "ttt",
        tagList: ['ttt','bbb'],
      },
      errors:{}
    }
  },
  methods: {
    publishArticle() {
      try{
        let article = this.article
        let tags = this.tags.trim()
        article.title = article.title.trim()
        article.description = article.description.trim()
        article.body = article.body.trim()
        article.tagList = tags.split(" ").filter(tag=>!!tag)
        if(!this.checkArticle(article)){
          return
        }
        createArticle({
            article:article
        }).then(res=>{
          console.log('res:',res)
          alert("Successful!")
          //this.resetArticle(article)
        })
      }catch(err){
        this.errors = err.response.data.errors;
      }
    },
    resetArticle(article){
      article.title = ''
      article.description = ''
      article.body = ''
      this.tags = ''
    },
    checkArticle(article){
      if(article.title.length===0){
        alert("Please write title!")
        return false
      }
      if(article.description.length===0){
        alert("Please write description!")
        return false
      }
      if(article.body.length===0){
        alert("Please write content")
        return false
      }
      return true
    }
  },
};
</script>

<style>
</style>