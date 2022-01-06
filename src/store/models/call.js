import request from "../../utils/request"
import BASEURL from "../../const/env"
const call = {
  state: {

  },
  reducers: {
    updateState(state, payload) {
      return { ...state, ...payload }
    }
  },
  effects: dispatch => ({

    /**
     * 获部门信息
     * @param
     */
    async getDepartments(payload) {
      let url = `${BASEURL}/departments`
      const res = await request.get(url, payload)
      return res
    },

    /**
     * 获call信息
     * @param
     */
    async getCallData(payload) {
      let url = `${BASEURL}/calluser`
      const res = await request.get(url, payload)
      return res
    },

    /**
     * 获call信息
     * @param
     */
    async getCallchairs(payload) {
      let url = `${BASEURL}/callchair`
      const res = await request.get(url, payload)
      return res
    }

  })
}
export default call