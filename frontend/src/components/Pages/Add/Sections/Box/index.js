import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'
import { Query, withApollo } from 'react-apollo'
import TinyMCEditor from '../../../../TinyMCEditor'

import { GET_BOX } from '../../../queries'
import { UPDATE_BOX } from '../../../mutaitons'

const { Option } = Select

class Box extends Component {
  handleInputChange = (e, name, value) => {
    const { client, itemId } = this.props

    client.mutate({
      mutation: UPDATE_BOX,
      variables: {
        name: name || e.target.name,
        value: value || e.target.value,
        itemId,
      },
    })
  }

  render() {
    const { itemId } = this.props
    return (
      <Query query={GET_BOX} variables={{ itemId }}>
        {({ data: { box }, loading }) => {
          if (loading) return null
          const { title, image, video, style, content } = box
          return (
            <Fragment>
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
              <Form.Item label="Video">
                <Input
                  name="video"
                  type="text"
                  placeholder="Video URL"
                  value={video}
                  onChange={this.handleInputChange}
                />
              </Form.Item>
              <Form.Item label="Style">
                <Select
                  defaultValue={style}
                  onChange={value =>
                    this.handleInputChange(null, 'style', value)
                  }
                >
                  <Option value="white">White</Option>
                  <Option value="grey">Grey</Option>
                  <Option value="vertical">Vertical</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Content">
                <TinyMCEditor
                  id={`${itemId}-editor`}
                  onEditorChange={content =>
                    this.handleInputChange(
                      null,
                      'content',
                      content || '<p></p>'
                    )
                  }
                  content={content}
                />
              </Form.Item>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

Box.propTypes = {
  client: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
}

export default withApollo(Box)
