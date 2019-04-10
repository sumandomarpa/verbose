import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Form, Input, Button, Select } from 'antd'
import { Query, withApollo } from 'react-apollo'

import Layout from '../../Layout'
import SortableList from './SortableList'
import PageItem from './PageItem'
import { ActionButtonsWrapper, AddNewPageWrapper } from './styles'
import { GET_PAGE } from '../queries'
import { UPDATE_PAGE } from '../mutaitons'

const { Option } = Select

class AddPage extends Component {
  handleInputChange = (e, name, value) => {
    const { client } = this.props
    client.mutate({
      mutation: UPDATE_PAGE,
      variables: {
        name: name || e.target.name,
        value: value || e.target.value,
      },
    })
  }

  render() {
    return (
      <Query query={GET_PAGE}>
        {({ data: { page }, loading }) => {
          if (loading) return null
          const { title, slug, image, vertical, type } = page
          return (
            <Layout>
              <AddNewPageWrapper>
                <Card title="Add New Page">
                  <Form>
                    <Form.Item label="Title">
                      <Input
                        name="title"
                        type="text"
                        value={title}
                        onChange={this.handleInputChange}
                      />
                    </Form.Item>
                    <Form.Item label="Image">
                      <Input
                        name="image"
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={this.handleInputChange}
                      />
                    </Form.Item>
                    <Form.Item label="Type">
                      <Select
                        defaultValue={type}
                        onChange={value =>
                          this.handleInputChange(null, 'type', value)
                        }
                      >
                        <Option value="page">Page</Option>
                        <Option value="news">News</Option>
                        <Option value="article">Article</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Slug">
                      <Input
                        name="slug"
                        type="text"
                        placeholder="Slug"
                        value={slug}
                        onChange={this.handleInputChange}
                      />
                    </Form.Item>
                    <Form.Item label="Vertical">
                      <Select
                        defaultValue={vertical}
                        onChange={value =>
                          this.handleInputChange(null, 'vertical', value)
                        }
                      >
                        <Option value="home-loans">Home Loans</Option>
                        <Option value="car-loans">Car Loans</Option>
                        <Option value="personal-loans">Personal Loans</Option>
                      </Select>
                    </Form.Item>
                    <SortableList
                      pageId={page.id}
                      updateItems={items => this.setState({ items })}
                      handleBlockItemChange={this.handleBlockItemChange}
                    />
                    <PageItem pageId={page.id} />
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
        }}
      </Query>
    )
  }
}

AddPage.propTypes = {
  client: PropTypes.object.isRequired,
}

export default withApollo(AddPage)
