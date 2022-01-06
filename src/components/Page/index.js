import React from 'react'
import styles from './index.module.scss'
export default function Index(props) {
  const {
    search,
    children
  } = props
  return (
    <div className={styles.pageCon}>
      <div className={styles.pageMain}>
        {/* 设置路由中的组件 */}
        {{ search } && <div className={styles.mainHeader}>{search}</div>}
        {{ children } && <div className={styles.mainCon}>{children}</div>}
      </div>
    </div>
  )
}
