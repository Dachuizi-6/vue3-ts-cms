import { IForm } from '@/base-ui/form'
export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItems: [
    {
      field: 'name',
      label: '角色名称',
      type: 'input',
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      label: '权限范围',
      type: 'select',
      placeholder: '请选择喜欢的运动',
      options: [
        { title: '所有权限', value: 'all' },
        { title: '日常事物', value: 'daily' },
        { title: '人事管理', value: 'people' }
      ]
    },
    {
      field: 'createAt',
      label: '请选择时间',
      type: 'datePicker',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
