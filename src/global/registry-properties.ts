import { App } from 'vue'

import { formatUtcTime } from '@/utils/date-format'

export default function registryProperties(app: App) {
  app.config.globalProperties.$filters = {
    foo() {
      console.log('foo~')
    },

    formatTime(time: string) {
      return formatUtcTime(time)
    }
  }
}
