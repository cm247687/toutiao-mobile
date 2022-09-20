<template>
  <van-cell
    class="article-item"
    :to="{
      name: 'article',
      params: {
        articleId: article.art_id,
      },
    }"
  >
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-warp">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image :src="article.cover.images[0]" fit="cover" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <div slot="default" v-if="article.cover.type === 1">
      <van-image
        class="right-cover"
        :src="article.cover.images[0]"
        fit="cover"
      />
    </div>
  </van-cell>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .cover-warp {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      width: 100%;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
    }
    .van-image {
      width: 100%;
      height: 146px;
    }
  }
  .label-info-wrap span {
    font-size: 23px;
    margin-right: 25px;
    color: #b4b4b4;
  }
}
</style>
