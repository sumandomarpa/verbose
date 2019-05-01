import React from 'react'
import { Form } from 'antd'
import TinyMCEditor from '../../TinyMCEditor'

export default function EditorBox(props) {
    const { label, name, value, onChange, id } = props
    return (
      <Form.Item label={label}>
        <TinyMCEditor
          id={`${id}-editor`}
          onEditorChange={value =>
            onChange(
              null,
              name,
              value || '<p></p>'
            )
          }
          content={value}
        />
      </Form.Item>
    )
}