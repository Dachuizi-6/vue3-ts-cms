<template>
  <div class="login">
    <login-pane></login-pane>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPane from './cpns/login-pane.vue'

export default defineComponent({
  components: {
    LoginPane
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
