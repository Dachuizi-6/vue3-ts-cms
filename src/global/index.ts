import { App } from 'vue'
import registryProperties from './registry-properties'

export default function registryGrobal(app: App) {
  app.use(registryProperties)
}
