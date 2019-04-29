import React from 'react'
import { Form, Input } from 'antd'

export default function TextareaBox(props) {
    const { label, name, value, onChange, id } = props
    return (
      <Form.Item label={label}>
        <Input.TextArea
          rows={4}
          name={name}
          value={value}
          onChange={e => onChange(id, e, name, value)}
        />
      </Form.Item>
    )
}