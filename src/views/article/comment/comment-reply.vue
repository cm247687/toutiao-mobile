<template>
  <div>
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon name="cross" slot="left" @click="$emit('close')" />
    </van-nav-bar>
    <div class="content-wrap">
      <commentItem :comments="comment" />
      <van-cell>全部回复</van-cell>
      <commentList type="c" :source="comment.com_id"></commentList>
    </div>
    <div class="bottom-wrap">
      <van-button size="small" round class="post-btn" @click="show = true"
        >写评论</van-button
      >
    </div>
    <div>
      <van-popup v-model="show" position="bottom">
        <commentPost :target="comment.com_id" @post-success="onPostSuccess" />
      </van-popup>
    </div>
  </div>
</template>

<script>
import commentItem from '@/views/article/comment/comment-item'
import commentList from '@/views/article/comment/comment-list'
import commentPost from '@/views/article/comment/comment-post'
export default {
  data () {
    return {
      show: false,
      commentList: []
    }
  },
  components: {
    commentItem,
    commentList,
    commentPost
  },

  props: {
    comment: {
      trpe: Object,
      required: true
    }
  },
  methods: {
    onPostSuccess (data) {
      this.show = false
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.bottom-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
.content-wrap {
  position: fixed;
  top: 92px;
  bottom: 88px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>
