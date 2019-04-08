import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { Query, withApollo } from 'react-apollo'
import { GET_BLOCK } from '../../../queries'
import { UPDATE_BLOCK } from '../../../mutaitons'

const { Option } = Select

class Block extends Component {
  constructor(props) {
    super(props)
    const html = '<p></p>'
    const contentBlock = htmlToDraft(html)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      )
      const editorState = EditorState.createWithContent(contentState)
      this.state = {
        editorState,
        title: '',
        image: '',
        video: '',
        style: '',
        content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      }
    }
  }

  handleChange = e => {
    this.props.handleBlockItemChange(e)
  }

  handleTitleChange = e => {
    e.preventDefault()
    this.setState({ title: e.target.value })
  }

  handleImageChange = e => {
    e.preventDefault()
    this.setState({ image: e.target.value })
  }

  handleVideoChange = e => {
    e.preventDefault()
    this.setState({ video: e.target.value })
  }

  handleStyleChange = value => {
    this.setState({ style: value })
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    })
  }

  handleInputChange = e => {
    const { client, itemId } = this.props

    client.mutate({
      mutation: UPDATE_BLOCK,
      variables: {
        name: e.target.name,
        value: e.target.value,
        itemId,
      },
    })
  }

  render() {
    const { editorState } = this.state
    const { itemId } = this.props

    return (
      <Query query={GET_BLOCK} variables={{ itemId }}>
        {({ data: { block }, loading }) => {
          if (loading) return null
          const { title, image, video } = block
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
                  type="text"
                  placeholder="Image URL"
                  value={image}
                  onChange={this.handleImageChange}
                />
              </Form.Item>
              <Form.Item label="Video">
                <Input
                  type="text"
                  placeholder="Video URL"
                  value={video}
                  onChange={this.handleVideoChange}
                />
              </Form.Item>
              <Form.Item label="Style">
                <Select
                  defaultValue="full-width"
                  onChange={this.handleStyleChange}
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
                <Editor
                  editorClassName="editorClassName"
                  editorState={editorState}
                  onEditorStateChange={this.onEditorStateChange}
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
