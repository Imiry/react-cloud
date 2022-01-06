import axios from 'axios'
const app = {
  state: {
    list:[],
    collapsed: JSON.parse(sessionStorage.getItem('collapsed')) || false,
  
  },
  reducers: {
    updateState(state,payload) {
      return { ...state, ...payload }
    }
  },
  effects: {
    async queryList() {
     await axios.get("http://localhost:4000/rights?_embed=children").then(res => {
        const list = res.data
        list.forEach(item => {
          if (item.children.length === 0) {
            item.children = ""
          }
        });
        list && this.updateState(list)
      })
    },
    toggleCollapsed(state,payload) {
      // console.log();  
      let collapsed = !state
      sessionStorage.setItem('collapsed',collapsed)
      this.updateState({collapsed})
    }
    
  }
}
// 'import/no-anonymous-default-export': [2, {"allowObject": true}],
export default app