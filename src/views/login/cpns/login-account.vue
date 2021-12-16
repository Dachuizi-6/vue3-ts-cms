<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="num">
        <el-input v-model="account.num" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'

import { rules } from '../config/account-config'

export default defineComponent({
  setup() {
    const account = reactive({
      num: '',
      password: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    // 点击登录
    const goLogin = () => {
      formRef.value?.validate((isValid) => {
        if (isValid) {
          console.log('去登录了呀')
        }
      })
    }

    return {
      account,
      rules,
      goLogin,
      formRef
    }
  }
})
</script>

<style scoped></style>
