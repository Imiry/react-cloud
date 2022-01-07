
import request from "../../utils/request"
import BASEURL from "../../const/env"
const app = {
  state: {
    menuList: JSON.parse(localStorage.getItem('menu')) || [],
    collapsed: JSON.parse(localStorage.getItem('collapsed')) || false,

  },
  reducers: {
    updateState(state, payload) {
      return { ...state, ...payload }
    }
  },
  effects: {

    /**
     * 获取侧边栏
     * @param
     */
    async queryList() {
      await request.get(`${BASEURL}/rights?_embed=children`).then(res => {
        if (res.status === 200) {
          const list = res.data
          list.forEach(item => {
            if (!Array.isArray(item.children)) {
              item.children = []
            }
          });
          localStorage.setItem("menu", JSON.stringify(list))
          list && this.updateState({ menuList: list })
        }

      })
    },

    /**
     * 侧边栏展开
     * @param
     */
    toggleCollapsed(state, payload) {
      let collapsed = !state
      localStorage.setItem('collapsed', collapsed)
      this.updateState({ collapsed })
    }

  }
}
// 'import/no-anonymous-default-export': [2, {"allowObject": true}],
export default app