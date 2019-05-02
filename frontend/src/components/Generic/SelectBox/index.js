import React from 'react'
import { Form, Select } from 'antd'

const { Option } = Select

export default function SelectBox(props) {
    const { label, name, value, options, onChange, ...rest } = props
    return (
      <Form.Item label={label}>
        <Select
          {...rest}
          defaultValue={value}
          onChange={(value) => 
              onChange(null, name, value)
          }
        >
          { options.map(option => <Option key={option.value} value={option.value}>{option.name}</Option>) }
        </Select>
      </Form.Item>
    )
}