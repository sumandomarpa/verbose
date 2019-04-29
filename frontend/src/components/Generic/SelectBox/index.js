import React from 'react'
import { Form, Select } from 'antd'

const { Option } = Select

export default function SelectBox(props) {
    const { label, name, value, options, onChange, id } = props
    return (
      <Form.Item label={label}>
        <Select
          defaultValue={value}
          onChange={value =>
            onChange(id, null, name, value)
          }
        >
          { options.map(option => <Option key={option.value} value={option.value}>{option.name}</Option>) }
        </Select>
      </Form.Item>
    )
}