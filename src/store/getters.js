const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  data: state => state.user.data,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
