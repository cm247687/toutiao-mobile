<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm (timer) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      const date = dayjs(timer).format('YYYY-MM-DD')
      console.log(date)
      try {
        await updateUserProfile({
          birthday: date
        })
        this.$emit('close')
        this.$emit('input', date)
        this.$toast.success('保存成功')
      } catch (err) {
        this.$toast.fail('修改失败请稍后重试')
        console.log(err)
      }
    }
  }
}
</script>

<style>
</style>
