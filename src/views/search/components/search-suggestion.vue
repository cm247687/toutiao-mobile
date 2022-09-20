<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadSearchSuggestion(value)
      }, 1000),
      immediate: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  methods: {
    async loadSearchSuggestion (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight (text) {
      const htmlStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, htmlStr)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
