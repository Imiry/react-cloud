import React, { useState } from 'react'
import { Layout, Menu, Dropdown, Badge } from 'antd';
import { withRouter } from 'react-router-dom'
import intl from 'react-intl-universal';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
//引入connect用于连接UI组件与redux
// import { toggleEcollpse } from '../../../redux/actions/collapsed'
import { connect } from 'react-redux'
import './index.scss'
import IconFont from '../../../components/IconFont/IconFont'
const { Header } = Layout;


const TopHeader = (props) => {
  const [currentLange, setCurrentLange] = useState(localStorage.getItem('lang_type'))
  const { collapsed } = props.app
  const changeCollapsed = () => {
    // props.app.toggleEcollpse(!props.app.collapsed)
    props.toggleCollapsed(collapsed)
  }
  const { role: { roleName } } = JSON.parse(localStorage.getItem("token"))
  const changeLanguage = (lan) => {
    localStorage.setItem('lang_type', lan)
    setCurrentLange(lan)
    intl.options.currentLocale = lan
    // console.log(intl.options.currentLocale);
  }
  const content = (
    <Menu style={{ width: 90 }}>
      <Menu.Item onClick={() => { changeLanguage('zh') }}>中文</Menu.Item>
      <Menu.Item onClick={() => { changeLanguage('en') }}>英文</Menu.Item>
    </Menu>
  );
  const menu = (
    <Menu>
      <Menu.Item>
        {roleName}
      </Menu.Item>
      <Menu.Item danger onClick={() => {
        localStorage.removeItem("token")
        localStorage.removeItem("lang_type")
        props.history.replace("/login")
      }}>退出</Menu.Item>
    </Menu>
  );
  return (
    <Header className="site-layout-background header-main" style={{ padding: '0 10px' }}>
      <div className="header-collapse">
        {
          collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
        }
      </div>
      <div className="header-setting">
        <div className="header-lan">
          <Dropdown overlay={content} placement="bottomCenter">
            {currentLange === 'zh' ? <IconFont type="icon-zhongwen" /> : <IconFont type="icon-yingwen" />}
          </Dropdown>
        </div>
        <div className="header-msg">
          <Badge dot={true}>
            <IconFont type="icon-xiaoxi_huaban1"></IconFont>
          </Badge>

        </div>
        <div className="header-set">
          <IconFont type="icon-shezhi1" onClick={() => props.history.push('/setting')}></IconFont>
        </div>
        <div className="header-avator">
          <Dropdown overlay={menu}>
            <IconFont type="icon-icon-test" />
          </Dropdown>
        </div>

      </div>
    </Header>
  )
}

// export default connect(
//   state => ({
//     collapsed: state.collapsed
//   }),
//   { toggleEcollpse }
// )(withRouter(TopHeader))
export default connect(
  (app) => {
    const { toggleCollapsed } = app.loading.effects.app
    return {
      ...app,
      toggleCollapsed
    }
  },
  ({ app }) => ({ ...app })
)(withRouter(TopHeader))


