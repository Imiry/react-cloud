
import request from "../../utils/request"
import BASEURL from "../../const/env"
const dashbord = {
  state: {

  },
  reducers: {
    updateState(state, payload) {
      return { ...state, ...payload }
    }
  },
  effects: {

    /**
     * 获取可视化数据
     * @param
     */

    async getChartData(payload) {
      let url = `${BASEURL}/chartData`
      const res = await request.get(url)
      return res
    },

  }
}

export default dashbord