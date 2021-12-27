import { IForm } from '@/base-ui/form'
export const modalFormConfig: IForm = {
  labelWidth: '100px',
  formItemStyle: {},
  colLayout: {
    span: 24
  },
  formItems: [
    {
      field: 'name',
      label: '角色名',
      type: 'input',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      label: '权限介绍',
      type: 'input',
      placeholder: '请输入权限介绍'
    }
  ]
}
