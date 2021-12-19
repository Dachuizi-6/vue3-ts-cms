<template>
  <div class="nav-header">
    <div class="guide" @click="handleFold">
      <el-icon class="fold-menu">
        <caret-left v-if="!isFold" />
        <caret-right v-else />
      </el-icon>
      <span class="title">面包屑</span>
    </div>
    <div class="user-info">
      <bread-crumb :breadcrumb="breadcrumb" />
      <user-drop-down />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { CaretLeft, CaretRight } from '@element-plus/icons-vue'
import UserDropDown from './user-dropdown.vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

import BreadCrumb from '@/base-ui/breadcrumb'
import { pathMapToBreadCrumb } from '@/utils/map-menus-to-routes'

export default defineComponent({
  components: {
    CaretLeft,
    CaretRight,
    UserDropDown,
    BreadCrumb
  },
  emits: ['changeFold'],
  setup(props, { emit }) {
    // 处理面包屑展开
    const isFold = ref(false)
    const handleFold = () => {
      isFold.value = !isFold.value
      emit('changeFold', isFold.value)
    }

    // 处理面包屑数据
    const store = useStore()
    const route = useRoute()
    const breadcrumb = computed(() => {
      const userMenus = store.state.login.userMenus
      const currentPath = route.path
      return pathMapToBreadCrumb(userMenus, currentPath)
    })

    return {
      handleFold,
      isFold,
      breadcrumb
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;
  .guide {
    display: flex;
    align-items: center;
    .fold-menu {
      font-size: 35px;
    }
    .title {
      font-weight: 700;
    }
  }
  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
