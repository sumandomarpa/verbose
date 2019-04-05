import React, { Component } from 'react'
import { Card, Form, Input, Button } from 'antd'
import uuidv4 from 'uuid/v4'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import Layout from '../../Layout'
import SortableList from './SortableList'
import PageItem from './PageItem'
import { ActionButtonsWrapper } from './styles'

export default class AddPage extends Component {
  state = {
    blockItem: {
      title: '',
    },
  }

  handleBlockItemChange = e => {
    this.setState({ blockItem: { [`${e.target.name}`]: e.target.value } })
  }

  render() {
    return (
      <Layout>
        <Card title="Add New Page">
          <Form>
            <Form.Item label="Title">
              <Input type="text" />
            </Form.Item>
            <SortableList
              updateItems={items => this.setState({ items })}
              handleBlockItemChange={this.handleBlockItemChange}
            />
            <PageItem />
            <ActionButtonsWrapper>
              <Button type="primary" htmlType="submit">
                Publish
              </Button>
            </ActionButtonsWrapper>
          </Form>
        </Card>
      </Layout>
    )
  }
}
