<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        type="info"
        size="mini"
        slot="title"
        round
        icon="search"
        class="search-btn"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id"
      >
        <ArticleList :channel="channel"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <ChannelEdit
        :my-channels="channels"
        :active="active"
        @upDate="upDateFn"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannel } from '@/api/user.js'
import ArticleList from './components/articleList'
import ChannelEdit from './components/channeledit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        // const { data } = await getUserChannel();
        // this.channels = data.data.channels;
        if (this.user) {
          // 登录状态
          const { data } = await getUserChannel()
          this.channels = data.data.channels
        } else {
          // 未登录状态
          const localChannels = getItem('USER_CHANNELS')
          if (getItem) {
            this.channels = localChannels
          } else {
            const { data } = await getUserChannel()
            this.channels = data.data.channels
          }
        }
      } catch (err) {
        this.$toast('获取导航列表失败')
      }
    },
    upDateFn (index, isChannelEditShow = true) {
      this.active = index
      this.isChannelEditShow = isChannelEditShow
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
      border-radius: 3px;
    }
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    width: 66px;
    height: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.9;
    i.toutiao {
      font-size: 33px;
    }
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background: url(../../assets/gradient-gray-line.png);
    background-size: contain;
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
}
</style>
