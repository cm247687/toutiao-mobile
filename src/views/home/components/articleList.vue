<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        :success-text="refreshSuccessText"
        success-duration="1500"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
          ></ArticleItem>
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-pull-refresh>
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/articles'
import ArticleItem from '@/components/article-item'
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      refreshSuccessText: '刷新成功'
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        // 模拟网络错误
        // if (Math.random() > 0.5) {
        //   JSON.parse("adasfsfgewc");
        // }
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        // 模拟网络错误;
        // if (Math.random() > 0.2) {
        //   JSON.parse("adasfsfgewc");
        // }
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false
        this.refreshSuccessText = `刷新成功，刷新了${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '刷新失败'
        this.isLoading = false
      }
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
