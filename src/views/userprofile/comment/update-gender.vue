<template>
  <div>
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      :default-index="value"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  data () {
    return {
      columns: ['男', '女']
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    async onConfirm (gender, index) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserProfile({
          gender: index
        })
        this.$emit('close')
        this.$emit('input', index)
        this.$toast.success('保存成功')
      } catch (err) {
        this.$toast.fail('修改失败请稍后重试')
      }
    }
  }
}
</script>

<style>
</style>
