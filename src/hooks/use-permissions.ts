import { useStore } from '@/store'

export function usePermissions(pageName: string, handel: string) {
  const store = useStore()

  const permissions = store.state.login.permissions

  const checkPerssion = `system:${pageName}:${handel}`

  return !!permissions.find((item) => item === checkPerssion)
}
