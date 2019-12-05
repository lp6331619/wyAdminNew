import Vue from 'vue'
import store from '@/store'
/**权限指令**/
const operatePriv = Vue.directive('operatePriv', {
  bind: function (el, binding) {
    // 获取按钮权限
    let btnPermissions = binding.value;
    console.log(btnPermissions, 99)
    if (!Vue.prototype.$_operatePriv(btnPermissions)) {
      Vue.nextTick(() => {
        el.parentNode.remove(el);
      })
    }
  }
});
// 权限检查方法
Vue.prototype.$_operatePriv = function (value) {
  const btnPermissionsStr = store.state.user.data.privileges
  return btnPermissionsStr[value];
}

export default { operatePriv };