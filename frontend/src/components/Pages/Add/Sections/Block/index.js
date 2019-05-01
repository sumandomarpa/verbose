import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Button, Modal, message } from 'antd'
import { Query, withApollo } from 'react-apollo'

import MediaLibrary from '../../../../MediaLibrary'
import TinyMCEditor from '../../../../TinyMCEditor'
import { GET_BLOCK, GET_PAGE } from '../../../queries'
import {
  UPDATE_BLOCK,
  UPSERT_BLOCK_TO_DB,
  DELETE_BLOCK_TO_DB,
  REPLACE_PAGE_ITEMS_ID,
  UPDATE_BLOCK_MEDIA,
} from '../../../mutaitons'
import { MediaImage, BlockSaveButtonWrapper } from './styles'

const { Option } = Select
const { confirm } = Modal

class Block extends Component {
  state = { visible: false, selectedMedia: {} }

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
    this.setState({ visible: true })
  }

  handleOk = async () => {
    const { client, itemId } = this.props
    const { selectedMedia } = this.state
    this.setState({
      visible: false,
    })

    await client.mutate({
      mutation: UPDATE_BLOCK_MEDIA,
      variables: {
        itemId,
        media: selectedMedia,
      },
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      selectedMedia: {},
    })
  }

  onMediaSelect = selectedMedia => {
    this.setState({ selectedMedia })
  }

  upsertBlock = async () => {
    const { client, itemId, rerenderSortable } = this.props

    const { page } = client.readQuery({
      query: GET_PAGE,
    })

    const { block } = client.readQuery({
      query: GET_BLOCK,
      variables: {
        itemId,
      },
    })

    const {
      data: { upsertBlock },
    } = await client.mutate({
      mutation: UPSERT_BLOCK_TO_DB,
      variables: {
        id: block.id,
        page: page.id,
        media: block.media.id,
        title: block.title,
        image: block.image,
        video: block.video,
        style: block.style,
        content: block.content,
        order: 1,
      },
    })

    /** Replace the DB Id in local state, if its just created */
    if (upsertBlock.id !== block.id) {
      client.mutate({
        mutation: UPDATE_BLOCK,
        variables: {
          name: 'id',
          value: upsertBlock.id,
          itemId: block.id,
        },
        refetchQueries: [
          {
            query: GET_BLOCK,
          },
        ],
      })
      client
        .mutate({
          mutation: REPLACE_PAGE_ITEMS_ID,
          variables: {
            itemId: block.id,
            newItemId: upsertBlock.id,
          },
        })
        .then(() => {
          rerenderSortable()
        })
    }

    if (upsertBlock.id) {
      message.success('Block updated successfully')
    } else message.error('Error! Block update failed')
  }

  deleteBlock = () => {
    const { removeItem, itemId, client } = this.props
    confirm({
      title: 'Are you sure wan to delte this Block?',
      content: "Once deleted, it can't be undone!!",
      async onOk() {
        try {
          const {
            data: { deleteBlock },
          } = await client.mutate({
            mutation: DELETE_BLOCK_TO_DB,
            variables: {
              id: itemId,
            },
          })
          if (deleteBlock.id) {
            message.success('Block deleted successfully')
            removeItem(itemId, 'Block')
          } else message.error('Error! Block delete failed')
        } catch (e) {
          removeItem(itemId, 'Block')
          message.success('Block deleted successfully')
        }
      },
      onCancel() {},
    })
  }

  render() {
    const { itemId } = this.props
    const { visible } = this.state

    const renderMediaLibrary = visible ? (
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
    ) : null

    return (
      <Query query={GET_BLOCK} variables={{ itemId }}>
        {({ data: { block }, loading }) => {
          if (loading) return null
          const { title, image, video, style, content, media } = block

          const { url } = media
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
              {renderMediaLibrary}
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
              <BlockSaveButtonWrapper>
                <Button type="danger" onClick={this.deleteBlock}>
                  Delete
                </Button>
                <Button type="default" onClick={this.upsertBlock}>
                  Save
                </Button>
              </BlockSaveButtonWrapper>
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
  removeItem: PropTypes.func.isRequired,
  rerenderSortable: PropTypes.func.isRequired,
}

export default withApollo(Block)
