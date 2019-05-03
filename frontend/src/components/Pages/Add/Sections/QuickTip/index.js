import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Modal, message } from 'antd'
import { Query, withApollo } from 'react-apollo'
import get from 'lodash/get'

import MediaLibrary from '../../../../MediaLibrary'
import TinyMCEditor from '../../../../TinyMCEditor'
import { GET_QUICK_TIP, GET_PAGE } from '../../../queries'
import {
  UPDATE_QUICK_TIP,
  UPSERT_QUICK_TIP_TO_DB,
  DELETE_QUICK_TIP_TO_DB,
  REPLACE_PAGE_ITEMS_ID,
  UPDATE_QUICK_TIP_MEDIA,
} from '../../../mutaitons'
import { MediaImage, QuickTipSaveButtonWrapper } from './styles'

const { confirm } = Modal

class QuickTip extends Component {
  state = { visible: false, selectedMedia: {} }

  selectImage = () => {
    this.setState({ visible: true })
  }

  handleOk = async () => {
    const { client, itemId } = this.props
    const { selectedMedia } = this.state
    this.setState({
      visible: false,
    })

    if (selectedMedia.id) {
      await client.mutate({
        mutation: UPDATE_QUICK_TIP_MEDIA,
        variables: {
          itemId,
          media: selectedMedia,
        },
      })
    }
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

  handleInputChange = (e, name, value) => {
    const { client, itemId } = this.props

    client.mutate({
      mutation: UPDATE_QUICK_TIP,
      variables: {
        name: name || e.target.name,
        value: value || e.target.value,
        itemId,
      },
    })
  }

  upsertQuickTip = async () => {
    const { client, itemId, rerenderSortable } = this.props

    const { page } = client.readQuery({
      query: GET_PAGE,
    })

    const { quickTip } = client.readQuery({
      query: GET_QUICK_TIP,
      variables: {
        itemId,
      },
    })

    const {
      data: { upsertQuickTip },
    } = await client.mutate({
      mutation: UPSERT_QUICK_TIP_TO_DB,
      variables: {
        id: quickTip.id,
        page: page.id,
        media: quickTip.media && quickTip.media.id,
        title: quickTip.title,
        content: quickTip.content,
        buttonText: quickTip.buttonText,
        buttonLink: quickTip.buttonLink,
        order: quickTip.order,
      },
    })

    /** Replace the DB Id in local state, if its just created */
    if (upsertQuickTip.id !== quickTip.id) {
      client.mutate({
        mutation: UPDATE_QUICK_TIP,
        variables: {
          name: 'id',
          value: upsertQuickTip.id,
          itemId: quickTip.id,
        },
      })
      client
        .mutate({
          mutation: REPLACE_PAGE_ITEMS_ID,
          variables: {
            itemId: quickTip.id,
            newItemId: upsertQuickTip.id,
          },
        })
        .then(() => {
          rerenderSortable()
        })
    }

    if (upsertQuickTip.id) {
      message.success('Quick Tip updated successfully')
    } else message.error('Error! Quick Tip update failed')
  }

  deleteQuickTip = () => {
    const { removeItem, itemId, client } = this.props
    confirm({
      title: 'Are you sure wan to delete this Quick Tip?',
      content: "Once deleted, it can't be undone!!",
      async onOk() {
        try {
          const {
            data: { deleteQuickTip },
          } = await client.mutate({
            mutation: DELETE_QUICK_TIP_TO_DB,
            variables: {
              id: itemId,
            },
          })
          if (deleteQuickTip.id) {
            message.success('Quick Tip deleted successfully')
            removeItem(itemId, 'QuickTip')
          } else message.error('Error! Quick Tip delete failed')
        } catch (e) {
          removeItem(itemId, 'QuickTip')
          message.success('Quick Tip deleted successfully')
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
      <Query query={GET_QUICK_TIP} variables={{ itemId }}>
        {({ data: { quickTip }, loading }) => {
          if (loading) return null
          const { title, content, buttonText, buttonLink, media } = quickTip

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
              <Form.Item label="Button Text">
                <Input
                  name="buttonText"
                  type="text"
                  placeholder="Button Text"
                  value={buttonText}
                  onChange={this.handleInputChange}
                />
              </Form.Item>
              <Form.Item label="Button Link">
                <Input
                  name="buttonLink"
                  type="text"
                  placeholder="https://ratecity.com.au/"
                  value={buttonLink}
                  onChange={this.handleInputChange}
                />
              </Form.Item>
              <Form.Item label="Image">
                {renderMedia}
                <Button onClick={this.selectImage}>Select Image</Button>
              </Form.Item>
              {renderMediaLibrary}
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
              <QuickTipSaveButtonWrapper>
                <Button type="danger" onClick={this.deleteQuickTip}>
                  Delete
                </Button>
                <Button type="default" onClick={this.upsertQuickTip}>
                  Save
                </Button>
              </QuickTipSaveButtonWrapper>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

QuickTip.propTypes = {
  client: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
  rerenderSortable: PropTypes.func.isRequired,
}

export default withApollo(QuickTip)