export const tableContentConfig = {
  title: '角色列表',
  propData: [
    {
      prop: 'name',
      label: '角色名称',
      minWidth: '100'
    },
    {
      prop: 'intro',
      label: '权限介绍',
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
