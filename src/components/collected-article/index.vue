<template>
  <van-icon
    color="#777"
    :name="value ? 'star' : 'star-o'"
    :class="{ collected: value }"
    @click="onCollected"
  />
</template>

<script>
import { AddCollected, DeleteCollected } from '@/api/articles'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    async onCollected () {
      try {
        if (this.value) {
          await DeleteCollected(this.articleId)
        } else {
          await AddCollected(this.articleId)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast.fail('操作失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped leng="less">
.collected {
  color: #ffa55f !important;
}
</style>
