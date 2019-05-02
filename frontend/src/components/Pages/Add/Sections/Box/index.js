import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Button, Modal, message } from 'antd'
import { Query, withApollo } from 'react-apollo'
import get from 'lodash/get'

import MediaLibrary from '../../../../MediaLibrary'
import TinyMCEditor from '../../../../TinyMCEditor'
import { GET_BOX, GET_PAGE } from '../../../queries'
import {
  UPDATE_BOX,
  UPSERT_BOX_TO_DB,
  REPLACE_PAGE_ITEMS_ID,
  DELETE_BOX_TO_DB,
  UPDATE_BOX_MEDIA,
} from '../../../mutaitons'
import { MediaImage, BoxSaveButtonWrapper } from './styles'

const { Option } = Select
const { confirm } = Modal

class Box extends Component {
  state = { visible: false, selectedMedia: {} }

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
      mutation: UPDATE_BOX_MEDIA,
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

  upsertBox = async () => {
    const { client, itemId, rerenderSortable } = this.props

    const { page } = client.readQuery({
      query: GET_PAGE,
    })

    const { box } = client.readQuery({
      query: GET_BOX,
      variables: {
        itemId,
      },
    })

    const {
      data: { upsertBox },
    } = await client.mutate({
      mutation: UPSERT_BOX_TO_DB,
      variables: {
        id: box.id,
        page: page.id,
        media: box.media && box.media.id,
        title: box.title,
        image: box.image,
        video: box.video,
        style: box.style,
        content: box.content,
        order: box.order,
      },
    })

    /** Replace the DB Id in local state, if its just created */
    if (upsertBox.id !== box.id) {
      client.mutate({
        mutation: UPDATE_BOX,
        variables: {
          name: 'id',
          value: upsertBox.id,
          itemId: box.id,
        },
        refetchQueries: [
          {
            query: GET_BOX,
          },
        ],
      })
      client
        .mutate({
          mutation: REPLACE_PAGE_ITEMS_ID,
          variables: {
            itemId: box.id,
            newItemId: upsertBox.id,
          },
        })
        .then(() => {
          rerenderSortable()
        })
    }

    if (upsertBox.id) {
      message.success('Box updated successfully')
    } else message.error('Error! Box update failed')
  }

  deleteBox = () => {
    const { removeItem, itemId, client } = this.props
    confirm({
      title: 'Are you sure wan to delete this Box?',
      content: "Once deleted, it can't be undone!!",
      async onOk() {
        try {
          const {
            data: { deleteBox },
          } = await client.mutate({
            mutation: DELETE_BOX_TO_DB,
            variables: {
              id: itemId,
            },
          })
          if (deleteBox.id) {
            message.success('Box deleted successfully')
            removeItem(itemId, 'Box')
          } else message.error('Error! Box delete failed')
        } catch (e) {
          removeItem(itemId, 'Box')
          message.success('Box deleted successfully')
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
      <Query query={GET_BOX} variables={{ itemId }}>
        {({ data: { box }, loading }) => {
          if (loading) return null
          const { title, image, video, style, content, media } = box

          const url = get(media, 'url')
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
              <BoxSaveButtonWrapper>
                <Button type="danger" onClick={this.deleteBox}>
                  Delete
                </Button>
                <Button type="default" onClick={this.upsertBox}>
                  Save
                </Button>
              </BoxSaveButtonWrapper>
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
  removeItem: PropTypes.func.isRequired,
  rerenderSortable: PropTypes.func.isRequired,
}

export default withApollo(Box)
