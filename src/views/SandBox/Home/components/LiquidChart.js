import React from 'react'
import { Liquid } from '@ant-design/charts';
import styles from './index.module.scss'
import IconFont from '../../../../components/IconFont/IconFont';
const LiquidChart = (props) => {

  const config = {
    percent: 0.25,
    outline: {
      border: 4,
      distance: 8,
    },
    with: 200,
    wave: {
      length: 128,
    },
  };

  const dataObj = [
    {
      icon: 'icon-eyeshield',
      dec: '代码克隆量'
    },
    {
      icon: 'icon-comment',
      dec: '文章阅读量'
    },
    {
      icon: 'icon-copyright',
      dec: '文章更新量'
    },
    {
      icon: 'icon-store',
      dec: '文章转发量'
    }
  ]

  return (
    <div className={styles.left_container}>
      <div className={styles.set_left}>
        {
          dataObj.map((item, index) => {
            return <div className={styles.set_left_item} key={index}>
              <IconFont type={item.icon} className={styles.item_icon}></IconFont>
              <div>{item.dec}</div>
            </div>
          })
        }
      </div>
      <div className={styles.set_right}>
        <Liquid {...config} />
      </div>
    </div>

  )
}
export default LiquidChart
