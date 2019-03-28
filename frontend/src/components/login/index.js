import React, { Component } from 'react'
import {
  Form, Icon, Input, Button,
} from 'antd';


import { LoginWrapper } from './styles'

export default class Login extends Component {
  render () {
    return (
      <LoginWrapper >
        <h1>Sign in</h1>
        <Form onSubmit={this.handleSubmit}>
        <Form.Item>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
        </Form.Item>
        <Form.Item>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
      </LoginWrapper>
    )
  }
}