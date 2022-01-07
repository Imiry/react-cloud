import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import Nopermission from '../../views/SandBox/Nopermission'
import Home from '../../views/SandBox/Home';
import RightList from '../../views/SandBox/RightManage/RightList';
import RoleList from '../../views/SandBox/RightManage/RoleList';
import UserList from '../../views/SandBox/UserManage';
import NewAdd from '../../views/SandBox/NewsManage/NewsAdd'
import NewsDraft from '../../views/SandBox/NewsManage/NewsDraft'
import NewsCategory from '../../views/SandBox/NewsManage/NewsCategory'
import NewsPreview from '../../views/SandBox/NewsManage/NewsPreview'
import NewsUpdate from '../../views/SandBox/NewsManage/NewsUpdate'
import Audit from '../../views/SandBox/AuditManage/Audit'
import AuditList from '../../views/SandBox/AuditManage/AuditList'
import Unpublished from '../../views/SandBox/PublishManage/Unpublished'
import Published from '../../views/SandBox/PublishManage/Published'
import Sunset from '../../views/SandBox/PublishManage/Sunset'
import MenuList from '../../views/SandBox/MenuManage/MenuList'
import Setting from '../../views/SandBox/Setting/Setting'
const LocalRouterMap = {
  "/home": Home,
  "/user-manage/list": UserList,
  "/right-manage/role/list": RoleList,
  "/right-manage/right/list": RightList,
  "/news-manage/add": NewAdd,
  "/news-manage/draft": NewsDraft,
  "/news-manage/category": NewsCategory,
  "/news-manage/preview/:id": NewsPreview,
  "/news-manage/update/:id": NewsUpdate,
  "/audit-manage/audit": Audit,
  "/audit-manage/list": AuditList,
  "/publish-manage/unpublished": Unpublished,
  "/publish-manage/published": Published,
  "/publish-manage/sunset": Sunset,
  "/menu-manage/list": MenuList,
  "/setting": Setting,
}
export default function NewsRouter() {
  const [BackRouteList, setBackRouteList] = useState([])
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:4000/rights"),
      axios.get("http://localhost:4000/children"),
    ]).then(res => {
      setBackRouteList([...res[0].data, ...res[1].data])
    })
  }, [])
  const { role: { rights } } = JSON.parse(localStorage.getItem("token"))

  const checkRoute = (item) => {
    return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
  }

  const checkUserPermission = (item) => {
    return rights.includes(item.key)
  }
  return (

    <Switch>
      {
        BackRouteList.map(item => {
          if (checkRoute(item) && checkUserPermission(item)) {
            return <Route path={item.key} key={item.key} component={LocalRouterMap[item.key]} exact />
          }
          return null
        }
        )
      }

      <Redirect from="/" to="/home" exact />
      {
        BackRouteList.length > 0 && <Route path="*" component={Nopermission} />
      }
    </Switch>
  )
}
