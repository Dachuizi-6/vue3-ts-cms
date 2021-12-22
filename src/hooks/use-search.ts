import { ref } from 'vue'

import PageContent from '@/components/page-content'

export function useSearchHook() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  // 点击重置和搜索
  const handleResetReal = () => {
    pageContentRef.value?.getPageData()
  }
  const handelSearchReal = (searchData: any) => {
    pageContentRef.value?.getPageData(searchData)
  }

  return [pageContentRef, handleResetReal, handelSearchReal]
}
