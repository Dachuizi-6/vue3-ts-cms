<template>
  <div class="login-pane">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon><user-filled /></el-icon>账号登录
          </span>
        </template>
        <login-account ref="loginAccountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><iphone /></el-icon>手机登录
          </span>
        </template>
        <login-phone ref="loginPhoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-now" @click="handelLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UserFilled, Iphone } from '@element-plus/icons-vue'

import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    UserFilled,
    Iphone,
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)

    const loginAccountRef = ref<InstanceType<typeof LoginAccount>>()
    const loginPhoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')

    const handelLoginClick = () => {
      if (currentTab.value === 'account') {
        loginAccountRef.value?.goLogin(isKeepPassword.value)
      } else {
        console.log('loginPhoneRef登录~')
      }
    }
    return {
      isKeepPassword,
      currentTab,
      loginAccountRef,
      loginPhoneRef,
      handelLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-pane {
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    display: flex;
    justify-content: space-between;

    margin-top: 10px;
  }

  .login-now {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
