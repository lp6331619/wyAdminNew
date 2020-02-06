import router from '@/router'
export default {
  // 打开新窗口
  openWindow(url, query) {
    let routeUrl = router.resolve({
      path: url,
      query: query
    })
    window.open(routeUrl.href, '_blank');
  }
}
