<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="获取数据失败"
    :immediate-check="false"
    @load="onLoad"
  >
    <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
      :comments="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // props自定义验证
      validator: (value) => {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getComments({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        const { results } = data.data
        this.list.push(...results)
        this.$emit('loadcomment', data.data)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  },
  components: {
    CommentItem
  }
}
</script>

<style>
</style>
