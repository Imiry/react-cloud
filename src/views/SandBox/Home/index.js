import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import Page from '../../../components/Page'
import PanleItem from './components/PanleItem.js'
import PanleChart from './components/PanleChart'
import LiquidChart from './components/LiquidChart'
import panle1 from '../../../style/images/panle1.png'
import panle2 from '../../../style/images/panle2.png'
import panle3 from '../../../style/images/panle3.png'
import panle4 from '../../../style/images/panle4.png'
const Home = (props) => {
  const [chartData, setChartData] = useState([])
  const panleData = [
    {
      num: 12000,
      title: '登录',
      imgUrl: panle1,
      lead: 20,
      status: 1
    },
    {
      num: 123000,
      title: '组件',
      imgUrl: panle2,
      lead: 40,
      status: 0
    },
    {
      num: 13000,
      title: '浏览',
      imgUrl: panle3,
      lead: 30,
      status: 1
    },
    {
      num: 17800,
      title: '克隆',
      imgUrl: panle4,
      lead: 10,
      status: 0
    }
  ]
  const { getChartData } = props
  //初始化数据
  useEffect(() => {
    getChartData().then(res => setChartData(res.data))
  }, [getChartData])
  return (
    <Page>
      <Row gutter={20}>
        {
          panleData.map((item, index) =>
            <Col span={6} key={index}>
              <PanleItem dataItem={item} ></PanleItem>
            </Col>
          )
        }
      </Row>
      <Row gutter={20} style={{ marginTop: '20px' }}>
        <Col span={10}>

          <LiquidChart></LiquidChart>
        </Col>
        <Col span={14}>
          <PanleChart chartData={chartData}></PanleChart>
        </Col>
      </Row>
    </Page>
  )
}
export default connect(
  ({ dashbord }) => ({ ...dashbord }),
  ({ dashbord }) => ({ ...dashbord })
)(Home)

