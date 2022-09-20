<template>
  <van-button
    v-if="userFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { AddFollow, DeleteFollow } from '@/api/articles'
export default {
  data () {
    return {
      loading: false
    }
  },
  props: {
    userFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onFollow () {
      this.loading = true
      try {
        if (this.userFollowed) {
          await DeleteFollow(this.userId)
        } else {
          await AddFollow(this.userId)
        }
        this.$emit('update-follow', !this.userFollowed)
      } catch (err) {
        let message = '网络错误，请稍后重试'
        if (err.response && err.response.status === 400) {
          message = '不能关注自己'
          this.loading = false
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>
