export interface pageType {
  // 总条数
  total: number
  // 当前页码
  currentPage: number
  // 每页几条数据
  pageSize: number
}
export interface pageDataType {
  // 总条数
  isTotal: number
  // 当前页码
  isCurrentPage: number
  // 每页几条数据
  isPageSize: number
  // 按钮的个数
  btnCount: number
  // 打开页码列表
  openPageNum: boolean
}
