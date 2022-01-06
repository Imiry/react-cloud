import React, { useEffect } from 'react'
import { Layout } from 'antd';
import SideMenu from '../../../components/SandBox/SideMenu';
import TopHeader from '../../../components/SandBox/TopHeader/TopHeader';
import NewsRouter from '../../../components/SandBox/NewsRouter';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './index.css'
const { Content } = Layout;
export default function NewsSandBox() {
  NProgress.start()
  useEffect(() => {
    NProgress.done()
  })
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          style={{
            overflow: "auto",
            height: 'clac(100-64vh)'
          }}
        >
          <NewsRouter></NewsRouter>
        </Content>
      </Layout>
    </Layout>
  )
}
