import router from '@/router'
export default {
  // 打开新窗口
  openWindow(url, query) {
    let routeUrl = router.resolve({
      path: url,
      query: query
    })
    window.open(routeUrl.href, '_blank');
  },
  // 转换数组
  FilterArray(data) {
    if (data) {
      const box = []
      for (const i in data) {
        box.push({
          text: data[i],
          value: i
        })
      }
      return box
    }
  },
  // 赋值 url 参数
  toList(searchForm, otherData, cb) {
    const query = {}
    const box = Object.assign({}, searchForm, otherData)
    for (const i in box) {
      query[i] = ((data) => {
        return data ? typeof data : false
      })(box[i]) ? JSON.stringify(box[i]) : ''
    }
    router.push({
      path: router.path,
      query: query
    })
    cb && cb()
  }
}
