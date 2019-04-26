import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Button, Modal } from 'antd'
import { Query, withApollo } from 'react-apollo'

import MediaLibrary from '../../../../MediaLibrary'
import TinyMCEditor from '../../../../TinyMCEditor'
import { GET_BLOCK } from '../../../queries'
import { UPDATE_BLOCK } from '../../../mutaitons'
import { MediaImage } from './styles'

const { Option } = Select

class Block extends Component {
  state = { visible: false, media: {} }

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

  selectImage = () => {
    console.log('select image')
    this.setState({ visible: true })
  }

  handleOk = e => {
    const { media } = this.state
    this.setState({
      visible: false,
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
      media: {},
    })
  }

  onMediaSelect = media => {
    this.setState({ media })
  }

  render() {
    const { itemId } = this.props
    const { visible } = this.state
    return (
      <Query query={GET_BLOCK} variables={{ itemId }}>
        {({ data: { block }, loading }) => {
          if (loading) return null
          const { title, image, video, style, content } = block

          const {
            media: { url },
          } = this.state
          const renderMedia = url ? <MediaImage src={url} /> : null
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
              <Form.Item label="Image">
                {renderMedia}
                <Button onClick={this.selectImage}>Select Image</Button>
              </Form.Item>

              <Modal
                title="Select an Image"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={1400}
                style={{ top: 10 }}
                okText="Insert Image"
              >
                <MediaLibrary
                  includeLayout={false}
                  onMediaSelect={this.onMediaSelect}
                />
              </Modal>

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

Block.propTypes = {
  client: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
}

export default withApollo(Block)
