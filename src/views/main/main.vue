<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isCollpase ? '60px' : '200px'">
        <nav-menu :isCollpase="isCollpase" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @changeFold="handleChangeFold" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NavMenu } from '@/components/nav-menu'
import { NavHeader } from '@/components/nav-header'

export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollpase = ref(false)

    const handleChangeFold = (collpase: boolean) => {
      isCollpase.value = collpase
    }
    return {
      handleChangeFold,
      isCollpase
    }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .main-container {
    height: 100%;

    .page {
      height: 100%;

      .page-header {
        height: 48px;
        display: flex;
        align-items: center;
        color: #333;
      }
      .page-content {
        height: calc(100% - 48px);
        color: #333;
        text-align: center;
        background-color: #f0f2f5;
        .page-info {
          background-color: #fff;
        }
      }
    }
  }

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
