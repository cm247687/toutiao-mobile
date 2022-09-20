<template>
  <div class="update-photo">
    <img :src="img" class="user-photo" ref="img" />
    <div class="bottom-btn">
      <div class="cancle" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onComfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {
  data () {
    return {
      ropper: null
    }
  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    onComfirm () {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        this.loadUpdateUserPhoto(blob)
      })
    },
    async loadUpdateUserPhoto (blob) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserPhoto(formData)
        this.$toast.success('头像更新成功')
        this.$emit('close')
        this.$emit('update-photo', data.data.photo)
      } catch (err) {
        this.$toast.fali('更换头像失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.update-photo {
  background-color: #000;
  height: 100%;
  .user-photo {
    display: block;
    max-width: 100%;
  }
  .bottom-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancle,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>
