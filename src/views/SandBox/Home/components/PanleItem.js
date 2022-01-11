import React from 'react'
import styles from './index.module.scss'
import IconFont from '../../../../components/IconFont/IconFont'
import { format_number } from '../../../../utils'
const Index = (props) => {
  const { dataItem } = props
  return (
    <div className={styles.panleCon}>
      <div className={styles.conLeft}>
        <div className={styles.leftNum}>¥{format_number(dataItem.num)}</div>
        <div className={styles.leftLead}>
          <span style={{ color: "rgb(88, 86, 86)" }}>{dataItem.title}</span>
          <span>
            {dataItem.status === 1 && <IconFont type='icon-shangsheng'></IconFont>}
            {dataItem.status === 0 && <IconFont type='icon-xiajiang'></IconFont>}
            {dataItem.lead}%
          </span>
        </div>
      </div>
      <div className={styles.conright}>
        <img src={dataItem.imgUrl} alt='' className={styles.panleImg}></img>
      </div>
    </div>
  )
}
export default Index