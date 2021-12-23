export const tableContentConfig = {
  title: '商品列表',
  propData: [
    {
      prop: 'name',
      label: '商品名称',
      minWidth: '100'
    },
    {
      prop: 'oldPrice',
      label: '原价格',
      minWidth: '80'
    },
    {
      prop: 'newPrice',
      label: '现价格',
      minWidth: '80'
    },
    {
      prop: 'imgUrl',
      label: '图片',
      minWidth: '100',
      slotName: 'imgUrl'
    },
    {
      prop: 'status',
      label: '上下架状态',
      minWidth: '80',
      slotName: 'status'
    },
    {
      prop: 'address',
      label: '发货地',
      minWidth: '80'
    },
    {
      prop: 'saleCount',
      label: '销量',
      minWidth: '80'
    },
    {
      prop: 'inventoryCount',
      label: '库存',
      minWidth: '80'
    },
    {
      prop: 'favorCount',
      label: '收藏数',
      minWidth: '80'
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
