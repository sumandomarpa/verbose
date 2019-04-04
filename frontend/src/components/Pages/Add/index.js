import React, { Component } from 'react'
import { Card, Form, Input, Button, Select } from 'antd'
import uuidv4 from 'uuid/v4'

import Layout from '../../Layout'
import SortableList from './SortableList'
import {
  AddNewPageWrapper,
  SortableActionButtonsWrapper,
  ActionButtonsWrapper,
} from './styles'

const { Option } = Select

export default class AddPage extends Component {
  state = {
    items: [{ type: 'block', orderKey: uuidv4() }],
    addSectionType: 'block',
  }

  addSection = () => {
    const { items, addSectionType } = this.state
    items.push({ type: addSectionType, orderKey: uuidv4() })
    this.setState({ items })
  }

  render() {
    const { items, addSectionType } = this.state
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
                items={items}
                onChange={orderKeys => {
                  const { items } = this.state
                  const orderedItems = []
                  // ordering the items
                  // according to the returned keys
                  orderKeys.forEach(orderKey => {
                    items.forEach(item => {
                      if (item.orderKey === orderKey) orderedItems.push(item)
                    })
                  })
                  this.setState({ items: orderedItems })
                }}
                updateItems={items => this.setState({ items })}
              />
              <SortableActionButtonsWrapper>
                <Select
                  defaultValue={addSectionType}
                  onChange={addSectionType => this.setState({ addSectionType })}
                >
                  <Option value="block">Block</Option>
                  <Option value="box">Box</Option>
                  <Option value="alert-box">Alert Box</Option>
                  <Option value="pros-cons">Pros and Cons</Option>
                  <Option value="faq">Faq</Option>
                  <Option value="faq-accordion">Faq Accordion</Option>
                  <Option value="quick-tip">Quick Tip</Option>
                  <Option value="grid">Grid</Option>
                  <Option value="case-studies">Case Studies</Option>
                </Select>
                <Button type="default" onClick={this.addSection}>
                  Add Section
                </Button>
              </SortableActionButtonsWrapper>
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
