export const tableContentConfig = {
  title: '角色列表',
  propData: [
    {
      prop: 'name',
      label: '菜单名称',
      minWidth: '100'
    },
    {
      prop: 'type',
      label: '菜单类型',
      minWidth: '80'
    },
    {
      prop: 'url',
      label: '菜单URL',
      minWidth: '120'
    },
    {
      prop: 'permission',
      label: '按钮权限',
      minWidth: '120'
    },
    {
      prop: 'icon',
      label: '菜单icon',
      minWidth: '120'
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
  isShowColumnIndex: false,
  isShowSelection: false,
  isShowFooter: false,
  expandRow: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  }
}
