<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      left-arrow
      class="page-nav-bar"
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="file" @change="onFileChange" />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isUpdateNameShow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isUpdateBirthdayShow = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
      @click="isUpdateGenderShow = true"
    />

    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      style="height: 100%"
    >
      <updateName
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
      ></updateName>
    </van-popup>
    <van-popup
      v-model="isUpdateGenderShow"
      position="bottom"
      style="height: 30%"
    >
      <updateGender
        v-if="isUpdateGenderShow"
        @close="isUpdateGenderShow = false"
        v-model="user.gender"
      ></updateGender>
    </van-popup>
    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
      style="height: 30%"
    >
      <updateBrithday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      ></updateBrithday>
    </van-popup>
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <updatePhoto
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
      ></updatePhoto>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './comment/update-name'
import updateGender from './comment/update-gender'
import updateBrithday from './comment/update-brithday'
import updatePhoto from './comment/update-photo'
export default {
  created () {
    this.loadUserProfile()
  },
  data () {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  components: {
    updateName,
    updateGender,
    updateBrithday,
    updatePhoto
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('获取用户信息失败')
      }
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  /deep/ .avatar {
    width: 45px;
    height: 45px;
  }
}
</style>
