import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type callbackFn = () => void

export function useModalHook(addCb?: callbackFn, editCb?: callbackFn) {
  const pageModelRef = ref<InstanceType<typeof PageModal>>()
  const editInfo = ref({})

  const handelAddReal = () => {
    editInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    addCb && addCb()
  }
  const handelEditReal = (row: any) => {
    editInfo.value = { ...row }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    editCb && editCb()
  }

  return [pageModelRef, editInfo, handelAddReal, handelEditReal]
}
