import React, { Component } from 'react'
import { Card, Form, Input, Button, Select } from 'antd'

import Layout from '../../Layout'
import SortableList from './SortableList'
import { SortableActionButtonsWrapper, ActionButtonsWrapper } from './styles'

const { Option } = Select

export default class AddPage extends Component {
  state = {
    items: [{ type: 'block' }],
    addSectionType: 'block',
  }

  addSection = () => {
    const { items, addSectionType } = this.state
    items.push({ type: addSectionType })
    this.setState({ items })
  }

  render() {
    const { items, addSectionType } = this.state
    return (
      <Layout>
        <Card title="Add New Page">
          <Form>
            <Form.Item label="Title">
              <Input type="text" />
            </Form.Item>
            <SortableList
              items={items}
              onChange={items => {
                this.setState({ items })
              }}
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
      </Layout>
    )
  }
}