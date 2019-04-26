import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'
import { Query, withApollo } from 'react-apollo'

import { GET_FAQ } from './queries'
import { UPDATE_FAQ } from './mutations'
import TinyMCEditor from '../TinyMCEditor'

const { Option } = Select

class FaqForm extends Component {
  // componentDidMount () {
  //   this.resetForm()
  // }

  // resetForm = () => {
  //   const { client } = this.props
  //   let data = {
  //     faq: {
  //       id: faqId,
  //       title: '',
  //       slug: '',
  //       description: '',
  //       short_description: '',
  //       order: '',
  //       vertical: 'home-loans',
  //       __typename: 'Faq',
  //     }
  //   }
  //   client.writeData({data})
  // }

  handleInputChange = (faqId, e, name, value) => {
    const { client } = this.props
    client.mutate({
      mutation: UPDATE_FAQ,
      variables: {
        name: name || e.target.name,
        value: value || e.target.value,
        faqId,
      },
    })
  }

  render() {
    return (
      <Query query={GET_FAQ}>
        {({ data: { faq }, loading }) => {
          if (loading) return null
          const {
            id,
            title,
            description,
            short_description,
            vertical="home-loans",
            slug,
            order
          } = faq
          return (
            <Fragment>
              <Form.Item label="Title">
                <Input
                  name="title"
                  value={title}
                  id={id}
                  onChange={e => this.handleInputChange(id, e)}
                />
              </Form.Item>
              <Form.Item label="Description">
                <TinyMCEditor
                  id={`${id}-editor`}
                  onEditorChange={description =>
                    this.handleInputChange(
                      id,
                      null,
                      'description',
                      description || '<p></p>'
                    )
                  }
                  content={description}
                />
              </Form.Item>
              <Form.Item label="Short Description">
                <Input.TextArea
                  name="short_description"
                  value={short_description}
                  rows={4}
                  id={id}
                  onChange={e => this.handleInputChange(id, e)}
                />
              </Form.Item>
              <Form.Item label="Slug">
                <Input
                  name="slug"
                  type="text"
                  placeholder="Slug"
                  value={slug}
                  onChange={e => this.handleInputChange(id, e)}
                />
              </Form.Item>
              <Form.Item label="Vertical">
                <Select
                  defaultValue={vertical}
                  onChange={value =>
                    this.handleInputChange(id, null, 'vertical', value)
                  }
                >
                  <Option value="home-loans">Home Loans</Option>
                  <Option value="car-loans">Car Loans</Option>
                  <Option value="personal-loans">Personal Loans</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Order">
                <Input
                  name="order"
                  type="number"
                  value={order}
                  onChange={e => this.handleInputChange(id, e)}
                />
              </Form.Item>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

FaqForm.propTypes = {
  client: PropTypes.object.isRequired,
}

export default withApollo(FaqForm)
