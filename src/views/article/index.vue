<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            :loading="followLoading"
            @click="onFollow"
            >已关注</van-button
          >
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="followLoading"
            @click="onFollow"
            >关注</van-button
          > -->
          <!-- 母版中的$event就是子组件传过来的值 -->
          <userFollowed
            :userFollowed="article.is_followed"
            class="follow-btn"
            :userId="article.aut_id"
            @update-follow="article.is_followed = $event"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <commentList
          :source="article.art_id"
          :list="commentList"
          @loadcomment="totleComments = $event.total_count"
          @reply-click="onReplyClick"
        ></commentList>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="show = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="totleComments" color="#777" />
          <CollectArticle
            v-model="article.is_collected"
            :articleId="article.art_id"
          ></CollectArticle>
          <ArticleLike
            v-model="article.attitude"
            :articleId="article.art_id"
          ></ArticleLike>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <van-popup v-model="show" position="bottom">
          <commentPost :target="article.art_id" @post-success="onPostSuccess" />
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <van-popup v-model="replyShow" position="bottom" style="height: 100%">
      <CommentReply
        v-if="replyShow"
        :comment="replyComment"
        @close="replyShow = false"
      ></CommentReply>
    </van-popup>
  </div>
</template>

<script>
import { getArticlesId } from '@/api/articles'
import { ImagePreview } from 'vant'
import userFollowed from '@/components/user-followed'
import CollectArticle from '@/components/collected-article'
import ArticleLike from '@/components/article-like'
import commentList from '@/views/article/comment/comment-list'
import commentPost from '@/views/article/comment/comment-post'
import CommentReply from '@/views/article/comment/comment-reply'
export default {
  data () {
    return {
      article: {},
      loading: true,
      errStatus: 0,
      followLoading: false,
      totleComments: 0,
      show: false,
      commentList: [],
      replyShow: false,
      replyComment: {}
    }
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    onClickLeft () {
      this.$toast('返回')
    },
    async loadArticle () {
      try {
        const { data } = await getArticlesId(this.articleId)
        // if (Math.random() > 0.2) {
        //   JSON.parse("sadasasfas");
        // }
        this.article = data.data
        setTimeout(() => {
          this.loadImagePreview()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        } else {
          console.log('获取数据失败', err)
        }
      }
      this.loading = false
    },
    loadImagePreview () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    onPostSuccess (data) {
      this.show = false
      console.log(data)
      this.commentList.unshift(data.new_obj)
    },
    onReplyClick (comments) {
      this.replyShow = true
      this.replyComment = comments
    }
  },
  components: {
    userFollowed,
    CollectArticle,
    ArticleLike,
    commentList,
    commentPost,
    CommentReply
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
