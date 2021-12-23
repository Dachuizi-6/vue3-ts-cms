import { IForm } from '@/base-ui/form'
export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItemStyle: {
    padding: '10px 40px'
  },
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'name',
      label: '商品名称',
      type: 'input',
      placeholder: '请输入商品名称'
    },
    {
      field: 'address',
      label: '发货地',
      type: 'input',
      placeholder: '请输入发货地'
    },
    {
      field: 'status',
      label: '上下架状态',
      type: 'select',
      placeholder: '请选择状态',
      options: [
        { title: '上架', value: 1 },
        { title: '下架', value: 0 }
      ]
    }
  ]
}
