<template>
  <div>
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="field-wrap">
      <van-field
        v-model.trim="loaclName"
        rows="2"
        autosize
        type="textarea"
        maxlength="11"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  created () {},
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (!this.loaclName.length) {
          this.$toast('请输入内容')
          return
        }
        await updateUserProfile({
          name: this.loaclName
        })
        this.$emit('close')
        this.$emit('input', this.loaclName)
        this.$toast.success('保存成功')
      } catch (err) {
        this.$toast.fail('修改失败请稍后重试')
      }
    }
  },
  data () {
    return {
      loaclName: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>
