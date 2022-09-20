<template>
  <div class="my-container">
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" :src="userInfo.photo" round fit="cover" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div class="header not-login" v-else>
      <div class="login-btn">
        <img src="~@/assets/mobile.png" alt="" class="mobile-img" />
        <span class="text" @click="$router.push('/login')">登录 / 注册</span>
      </div>
    </div>
    <van-grid column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell title="退出登录" class="logout" v-if="user" @click="onLogout" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    onLogout () {
      this.$dialog
        .confirm({
          title: '确认退出?'
        })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {})
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {}
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url(~@/assets/banner.png);
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 15px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
        }
      }
    }
    .data-stats {
      display: flex;
      height: 130px;
      .data-item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      .toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout {
    text-align: center;
    margin-top: 9px;
    color: #d86262;
  }
}
</style>
