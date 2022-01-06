import React, { useEffect } from 'react'

import { connect } from 'react-redux'
const Home = (props) => {
  useEffect(() => {

  }, [])
  return (
    <div>
      {/* {props.getUserList().then(res => console.log(res))} */}
    </div>
  )
}
export default connect(
  // ({ userList }) => ({ ...userList }),
  // ({ userList }) => ({ ...userList })
)(Home)
