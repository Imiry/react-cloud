import React, { useEffect, useState } from 'react'
import { Line } from '@ant-design/charts';
import styles from './index.module.scss'
const PanleChart = (props) => {
  const { chartData } = props
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(chartData)
  }, [chartData]);

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    seriesField: 'type',
    smooth: true
  };

  return (
    <div className={styles.right_container}>
      <Line {...config} />
    </div>

  )
}
export default PanleChart
