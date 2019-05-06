import React from 'react'
import { Form, Select } from 'antd'
import isObject from 'lodash/isObject'

const { Option } = Select

export default function MultiSelectBox(props) {
    const { label, name, options, onChange, ...rest } = props
    let { value } = props
    let renderOptions = options.map(option => {
        if (!isObject(option)) return <Option key={option} data-value={option}>{option}</Option>
        return <Option key={option.name} data-value={option.value}>{option.name}</Option>
    })
    const handleChange = (value, options) => {
        onChange(null, name, options.map(option => option.props['data-value']))
    }
    value = options.filter(option => value.includes(option.value)).map(option => option.name)
    return (
      <Form.Item label={label}>
        <Select
          {...rest}
          mode="multiple"
          value={value}
          onChange={handleChange}
        >
          { renderOptions }
        </Select>
      </Form.Item>
    )
}