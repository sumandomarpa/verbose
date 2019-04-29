import React from 'react'
import { Form, Input } from 'antd'

export default function TextBox(props) {
    const { label, name, value, onChange, id } = props
    return (
      <Form.Item label={label}>
        <Input
          name={name}
          type="text"
          value={value}
          onChange={e => onChange(id, e, name, value)}
        />
      </Form.Item>
    )
}