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
      label: '用户名',
      type: 'input',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      label: '真实姓名',
      type: 'input',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      label: '密码',
      type: 'password',
      placeholder: '请输入密码',
      isHidden: true
    },
    {
      field: 'cellphone',
      label: '电话号码',
      type: 'input',
      placeholder: '请输入电话号码'
    }
  ]
}
