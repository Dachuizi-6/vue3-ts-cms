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
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handelAddNew">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'

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
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    // 1、监听父组件传递过来的数据
    const formData = ref<any>({})
    watch(
      () => props.editInfo,
      (newVal) => {
        for (const item of props.modalFormConfig.formItems) {
          formData.value[item.field] = newVal[item.field]
        }
        // formData.value = newVal
      }
    )

    // 2、点击确定
    const store = useStore()
    const handelAddNew = () => {
      dialogVisible.value = false
      if (!Object.keys(props.editInfo).length) {
        // 新建
        store.dispatch('system/addNewPageData', {
          pageName: props.pageName,
          addData: { ...formData.value, ...props.otherInfo }
        })
      } else {
        // 编辑
        store.dispatch('system/editPageData', {
          pageName: props.pageName,
          id: props.editInfo.id,
          editData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      dialogVisible,
      formData,
      handelAddNew
    }
  }
})
</script>

<style scoped></style>
