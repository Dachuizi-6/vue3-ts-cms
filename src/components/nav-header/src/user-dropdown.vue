<template>
  <div class="drop-down">
    <el-dropdown>
      <span class="el-dropdown-link user-info">
        <el-avatar class="avatar" :icon="UserFilled"> </el-avatar>
        {{ name }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handelEdit">退出登录</el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { UserFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

import { useStore } from '@/store'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.login.userInfo.name)

    const handelEdit = () => {
      localCache.clearCache()
      router.push({
        path: '/login'
      })
    }

    return {
      name,
      handelEdit,
      UserFilled
    }
  }
})
</script>

<style scoped lang="less">
.user-info {
  display: flex;
  align-items: center;
}
.avatar {
  margin-right: 10px;
}
</style>
