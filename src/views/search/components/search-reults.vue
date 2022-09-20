<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(results, index) in list"
        :key="index"
        :title="results.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1.发起请求数据
        const { data } = await getSearchResults({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        console.log(data)
        // 2.渲染数据
        const { results } = data.data
        this.list.push(...results)
        // 3.将本次加载中的loading关闭
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          // 5如果有获取下一页数据
          this.page++
          //  模拟网络错误;
          // if (Math.random() > 0.2) {
          //   JSON.parse("adasfsfgewc");
          // }
        } else {
          // 6 如果没有则将加载状态finished设置为结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style>
</style>
