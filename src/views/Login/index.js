import React from 'react'

import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, GooglePlusOutlined } from '@ant-design/icons';
import './index.scss'
import Particles from 'react-particles-js';
import { connect } from 'react-redux'

const Login = (props) => {
  const { loginService, queryList } = props
  const onFinish = (values) => {
    let params = {
      username: values.username,
      password: values.password
    }
    loginService(params).then(res => {
      if (res.status === 200) {
        localStorage.setItem("token", JSON.stringify(res.data[0]))
        queryList()
        props.history.push("/")
        message.success("欢迎登录云!")
      } else {
        message.error("登录失败!")
      }
    })
  };


  return (
    <div style={{ background: 'rgb(35, 39, 65)', height: "100%", overflow: 'hidden' }}>
      <Particles height={document.documentElement.clientHeight} params={{
        "background": {
          "color": {
            "value": "#000000"
          }
        },
        "fullScreen": {
          "enable": true,
          "zIndex": 1
        },
        "interactivity": {
          "events": {
            "onClick": {
              "enable": true,
              "mode": "push"
            },
            "onHover": {
              "enable": true,
              "mode": "repulse"
            }
          }
        },
        "particles": {
          "color": {
            "value": "#ff0000",
            "animation": {
              "h": {
                "enable": true,
                "speed": 20
              }
            }
          },
          "links": {
            "color": {
              "value": "#ffffff"
            },
            "enable": true,
            "opacity": 0.4
          },
          "move": {
            "enable": true,
            "outModes": {
              "bottom": "out",
              "left": "out",
              "right": "out",
              "top": "out"
            },
            "speed": 6
          },
          "number": {
            "density": {
              "enable": true
            },
            "value": 80
          },
          "opacity": {
            "value": 0.5
          },
          "size": {
            "value": {
              "min": 0.1,
              "max": 3
            }
          }
        }
      }} />
      <div className="login">
        <div style={{ textAlign: "center", fontSize: 50, color: "#fff" }} ><GooglePlusOutlined /></div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default connect(
  ({ user, app }) => ({ ...user, ...app }),
  ({ user, app }) => ({ ...user, ...app })
)(Login)