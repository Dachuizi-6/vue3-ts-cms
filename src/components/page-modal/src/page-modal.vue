<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <zw-form v-bind="modalFormConfig" v-model="formData"></zw-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import ZwForm from '@/base-ui/form'

export default defineComponent({
  components: {
    ZwForm
  },
  props: {
    modalFormConfig: {
      type: Object,
      required: true
    }
  },
  setup() {
    const dialogVisible = ref(true)
    const formData = ref({})

    return {
      dialogVisible,
      formData
    }
  }
})
</script>

<style scoped></style>
