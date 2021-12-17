<template>
  <div class="nav-header">
    <div class="guide" @click="handleFold">
      <el-icon class="fold-menu">
        <caret-left v-if="!isFold" />
        <caret-right v-else />
      </el-icon>
      <span class="title">面包屑</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CaretLeft, CaretRight } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    CaretLeft,
    CaretRight
  },
  emits: ['changeFold'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFold = () => {
      isFold.value = !isFold.value
      emit('changeFold', isFold.value)
    }
    return {
      handleFold,
      isFold
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
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
}
</style>
