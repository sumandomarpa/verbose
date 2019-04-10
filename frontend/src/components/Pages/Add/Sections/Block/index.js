import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'
import { Query, withApollo } from 'react-apollo'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { GET_BLOCK } from '../../../queries'
import { UPDATE_BLOCK } from '../../../mutaitons'

const { Option } = Select

class Block extends Component {
  handleInputChange = (e, name, value) => {
    const { client, itemId } = this.props

    client.mutate({
      mutation: UPDATE_BLOCK,
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
      <Query query={GET_BLOCK} variables={{ itemId }}>
        {({ data: { block }, loading }) => {
          if (loading) return null
          const { title, image, video, style, content } = block
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
                  <Option value="full-width">Full Width</Option>
                  <Option value="content-left">Content Left</Option>
                  <Option value="content-right">Content Right</Option>
                  <Option value="content-left-column">
                    Content Left Column
                  </Option>
                  <Option value="content-right-column">
                    Content Left Column
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item label="Content">
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onChange={(event, editor) => {
                    const data = editor.getData() || '<p></p>'
                    this.handleInputChange(null, 'content', data)
                  }}
                />
              </Form.Item>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

Block.propTypes = {
  client: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
}

export default withApollo(Block)
