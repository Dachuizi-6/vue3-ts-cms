<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      center
      destroy-on-close
    >
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
import { defineComponent, ref, watch } from 'vue'

import ZwForm from '@/base-ui/form'

export default defineComponent({
  components: {
    ZwForm
  },
  props: {
    modalFormConfig: {
      type: Object,
      required: true
    },
    editInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    watch(
      () => props.editInfo,
      (newVal) => {
        for (const item of props.modalFormConfig.formItems) {
          formData.value[item.field] = newVal[item.field]
        }
        formData.value = newVal
      }
    )

    return {
      dialogVisible,
      formData
    }
  }
})
</script>

<style scoped></style>
