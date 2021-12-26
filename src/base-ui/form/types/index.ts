type IFormType = 'input' | 'password' | 'select' | 'datePicker'

export interface IFormItem {
  field: string
  label: string
  placeholder?: any
  type: IFormType
  // 针对select
  options?: any[]
  // 针对其他
  otherOptions?: any
  rules?: any[]
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  formItemStyle?: any
  colLayout?: any
}
