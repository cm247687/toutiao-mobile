<template>
  <div class="channel-edit">
    <van-cell>
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="default"
        size="mini"
        round
        class="channel-edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(channel, index) in myChannels"
        :key="index"
        class="grid-item"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fiexdchannels.includes(channel.id)"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
       <!-- 频道推荐 -->
      <van-cell :border="false">
        <div slot="title" class="title-text">推荐频道</div>
      </van-cell>
      <van-grid :gutter="10" class="recommend-grid">
        <van-grid-item
          v-for="(channel, index) in recommendChannels"
          :key="index"
          :text="channel.name"
          icon="plus"
          class="grid-item"
          @click="onAddChannel(channel)"
        />
      </van-grid>
  </div>
</template>

<script>
import { allChannels, addChannels, deleteChannels } from '@/api/channels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fiexdchannels: [0]
    }
  },
  created () {
    this.loadAllChannels()
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    },
    // 映射state里面的user，数组或者对象形式
    ...mapState(['user'])
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await allChannels()
        console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    async onAddChannel (channel) {
      this.myChannels.push(channel)
      if (this.user) {
        // 登录状态
        try {
          await addChannels({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (err) {
          this.$toast('操作失败，请稍后重试')
        }
      } else {
        // 未登录状态
        setItem('USER_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 1. 如果是固定频道，则不删除
        if (this.fiexdchannels.includes(channel.id)) {
          return
        }
        //  删除频道
        this.myChannels.splice(index, 1)
        // 2. 如果删除的激活频道之前的频道，则更新激活的频道项
        if (index <= this.active) {
          this.$emit('upDate', this.active - 1, true)
        }
        this.deleteChannels(channel)
      } else {
        //  跳转频道
        this.$emit('upDate', index, false)
      }
    },
    async deleteChannels (channel) {
      if (this.user) {
        // 登录状态删除频道
        try {
          await deleteChannels(channel.id)
          console.log(channel)
        } catch (err) {
          console.log(err)
          this.$toast('操作失败，请稍后重试')
        }
      } else {
        // 未登录状态删除频道
        setItem('USER_CHANNELS', this.myChannels)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 82px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .channel-edit-btn {
    width: 104px;
    height: 47px;
    font-size: 26px;
    color: #f85c5c;
    border: 1px solid #f85c5c;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      .active {
        color: red;
      }
    }
    .van-grid-item__text,
    .text {
      font-size: 28px;
      color: #222222;
      margin-top: 0;
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        top: -10px;
        right: -10px;
        color: #cacaca;
        z-index: 2;
        font-size: 30px;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 24px;
        }
        .van-grid-item__text {
          margin-top: 0;
          padding-left: 6px;
        }
      }
    }
  }
}
</style>
