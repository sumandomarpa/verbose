import React, { Fragment } from 'react'
import { Form, Input, Select } from 'antd';
import { Editor } from 'react-draft-wysiwyg';

const Option = Select.Option;

export default () => (
  <Fragment>
    <Form.Item label="Title">
      <Input type="text" />
    </Form.Item>
    <Form.Item label="Image">
      <Input type="text" placeholder="Image URL" />
    </Form.Item>
    <Form.Item label="Video">
      <Input type="text" placeholder="Video URL" />
    </Form.Item>
    <Form.Item label="Style">
      <Select defaultValue="full-width">
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
      />
    </Form.Item>
  </Fragment>
)
