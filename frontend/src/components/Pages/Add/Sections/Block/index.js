import React, { Component, Fragment } from 'react'
import { Form, Input, Select } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

const { Option } = Select

export default class Block extends Component {
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

  render() {
    const { editorState } = this.state
    const { title, image, video, style, content } = this.state
    return (
      <Fragment>
        <Form.Item label="Title">
          <Input type="text" value={title} onChange={this.handleTitleChange} />
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
          <Select defaultValue="full-width" onChange={this.handleStyleChange}>
            <Option value="full-width">Full Width</Option>
            <Option value="content-left">Content Left</Option>
            <Option value="content-right">Content Right</Option>
            <Option value="content-left-column">Content Left Column</Option>
            <Option value="content-right-column">Content Left Column</Option>
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
  }
}
