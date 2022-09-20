<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDelectShow">
        <span class="delAll-btn" @click="$emit('delect-search-histories')"
          >删除全部</span
        >
        <span @click="isDelectShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDelectShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchhistories"
      :key="index"
      @click="onSearchHistories(item, index)"
    >
      <van-icon name="close" v-show="isDelectShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    searchhistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDelectShow: false
    }
  },
  methods: {
    onSearchHistories (item, index) {
      if (this.isDelectShow) {
        // 删除状态
        this.searchhistories.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-history {
  .delAll-btn {
    margin-right: 10px;
  }
}
</style>
