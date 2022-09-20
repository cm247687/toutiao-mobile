<template>
  <van-icon
    color="#777"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="onLike"
    :class="{ likebtn: value === 1 }"
  />
</template>

<script>
import { AddLike, DeleteLike } from '@/api/articles'
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onLike () {
      let status = -1
      try {
        if (this.value === 1) {
          await DeleteLike(this.articleId)
        } else {
          await AddLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('点赞失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.likebtn {
  color: #e5645f !important;
}
</style>
