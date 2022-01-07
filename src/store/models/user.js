import request from "../../utils/request"
import BASEURL from "../../const/env"
const user = {
  state: {
    collapsed: JSON.parse(sessionStorage.getItem('collapsed')) || false,
    regionsData: [],//区域数据
    rolesData: [],//用户的权限
  },
  reducers: {
    updateState(state, payload) {
      return { ...state, ...payload }
    }
  },
  effects: dispatch => ({

    /**
     * 登录
     * @param
     */
    async loginService(payload) {
      let url = `${BASEURL}/users?username=${payload.username}&password=${payload.password}&roleState=true&_expand=role`
      const res = await request.get(url)
      return res
    },


    /**
     * 获取用户
     * @param
     */
    async getUserList(payload) {
      let url = `${BASEURL}/users/?_expand=role`
      const res = await request.get(url, payload)
      return res
    },

    /**
     * 获取区域
     * @param
     */
    async getUserRegions(payload) {
      let url = `${BASEURL}/regions`
      const res = await request.get(url, payload)
      this.updateState({
        regionsData: res?.data || []
      })
    },

    /**
     * 获取用户的权限
     * @param
     */
    async getUserRoles(payload) {
      let url = `${BASEURL}/roles`
      const res = await request.get(url, payload)
      this.updateState({
        rolesData: res.data
      })
    },

    /**
     * 添加用户
     * @param
     */
    async addUser(payload) {
      let url = `${BASEURL}/users`
      const res = await request.post(url, payload)
      return res
    },

    /**
     * 更新用户
     * @param
     */
    async updateUser(payload) {
      let {
        id, value
      } = payload
      let url = `${BASEURL}/users/${id}`
      const res = await request.patch(url, value)
      return res
    },

    /**
     * 删除用户
     * @param
     */
    delUser(payload) {
      let url = `${BASEURL}/users/${payload.id}`
      const res = request.del(url)
      return res
    },


    /**
     * 更新用户状态
     * @param
     */
    async updateUserStatus(payload) {

      let url = `${BASEURL}/users/${payload.id}`
      const res = await request.patch(url, { roleState: payload.roleState })
      return res
    },


  })
}
export default user