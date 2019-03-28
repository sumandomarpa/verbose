import React, { Component } from 'react'
import { Card, Form, Input, Button } from 'antd';

import Layout from '../../Layout'
import SortableList from './SortableList'

export default class AddPage extends Component {
  state = {
    items: [1, 2, 3]
  };
  render () {
    return (
      <Layout>
        <Card title="Add New Page">
          <Form>
            <Form.Item label="Title">
              <Input type="text" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Add Page</Button>
            </Form.Item>
            <SortableList
              items={this.state.items}
              onChange={(items) => {
                  this.setState({ items });
              }}
            >
            </SortableList>
          </Form>
        </Card>
      </Layout>
    )
  }
}