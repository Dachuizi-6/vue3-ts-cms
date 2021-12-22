export const tableContentConfig = {
  title: '用户列表',
  propData: [
    {
      prop: 'name',
      label: '用户名',
      minWidth: '100'
    },
    {
      prop: 'realname',
      label: '真实姓名',
      minWidth: '100'
    },
    {
      prop: 'enable',
      label: '状态',
      minWidth: '100',
      slotName: 'status'
    },
    {
      prop: 'cellphone',
      label: '电话号码',
      minWidth: '100'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '120',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '最后操作时间',
      minWidth: '120',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handel'
    }
  ],
  isShowColumnIndex: true,
  isShowSelection: true
}
