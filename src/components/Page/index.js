import React from 'react'
import styles from './index.module.scss'
export default function Index(props) {
  const {
    search,
    children,
    buttonSlot
  } = props
  return (
    <div className={styles.pageCon}>
      <div className={styles.pageMain}>
        {!!search && <div className={styles.mainHeader}>{search}</div>}
        {{ children } && <div className={styles.mainCon}>
          {!!buttonSlot && <div className={styles.btnSlot}>{buttonSlot}</div>}
          {children}
        </div>}
      </div>
    </div>
  )
}
