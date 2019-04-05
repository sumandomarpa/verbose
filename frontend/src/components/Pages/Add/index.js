import React, { Component } from 'react'
import { Card, Form, Input, Button, Select } from 'antd'
import uuidv4 from 'uuid/v4'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import Layout from '../../Layout'
import SortableList from './SortableList'
import PageItem from './PageItem'
import { ActionButtonsWrapper, AddNewPageWrapper } from './styles'

const { Option } = Select

export default class AddPage extends Component {
  render() {
    return (
      <Layout>
        <AddNewPageWrapper>
          <Card title="Add New Page">
            <Form>
              <Form.Item label="Title">
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Image">
                <Input type="text" placeholder="Image URL" />
              </Form.Item>
              <Form.Item label="Type">
                <Select defaultValue="page">
                  <Option value="page">Page</Option>
                  <Option value="news">News</Option>
                  <Option value="article">Article</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Slug">
                <Input type="text" placeholder="Slug" />
              </Form.Item>
              <Form.Item label="Vertical">
                <Select defaultValue="home-loans">
                  <Option value="home-loans">Home Loans</Option>
                  <Option value="car-loans">Car Loans</Option>
                  <Option value="personal-loans">Personal Loans</Option>
                </Select>
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
        </AddNewPageWrapper>
      </Layout>
    )
  }
}
