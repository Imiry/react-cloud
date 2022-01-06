import React from 'react'

import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined,GooglePlusOutlined} from '@ant-design/icons';
import './index.scss'
import Particles from 'react-particles-js';
import axios from 'axios'


const Login = (props) => {
  const onFinish = (values) => {
        axios.get(`http://localhost:4000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res=>{
            console.log(res.data)
            if(res.data.length===0){
                message.error("用户名或密码不匹配")
            }else{
                localStorage.setItem("token",JSON.stringify(res.data[0]))
                props.history.push("/")
            }
        })
  };

  
  return (
    <div style={{ background: 'rgb(35, 39, 65)', height: "100%",overflow:'hidden' }}>
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
      }}/>
      <div className="login">
        <div style={{textAlign:"center",fontSize:50,color:"#fff"}} ><GooglePlusOutlined /></div>
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
export default Login