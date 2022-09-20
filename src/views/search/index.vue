<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @focus="searchResultShow = false"
        @cancel="onCancel"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResults
      v-if="searchResultShow"
      :searchText="searchText"
    ></SearchResults>
    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></SearchSuggestion>
    <!-- 搜索历史 -->
    <SearchHistory
      v-else
      :searchhistories="searchHistories"
      @delect-search-histories="searchHistories = []"
      @search="onSearch"
    ></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResults from './components/search-reults'
import { getItem, setItem } from '@/utils/storage'
export default {
  data () {
    return {
      searchText: '',
      searchResultShow: false,
      searchHistories: getItem('USER_SEARCH_HISTORIES') || []
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResults
  },
  methods: {
    onSearch (val) {
      this.searchText = val
      // 查看数组中是否有这个数据，没有就返回-1
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.searchResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  watch: {
    searchHistories () {
      setItem('USER_SEARCH_HISTORIES', this.searchHistories)
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
