import React from 'react'
import { Form, Select } from 'antd'
import { Query } from 'react-apollo'
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import keys from 'lodash/keys'
import { string, oneOfType, array, func, shape, object, arrayOf } from 'prop-types';

const { Option } = Select

export default class SelectBox extends React.Component {

  static propTypes = {
    label: string,
    name: string.isRequired,
    value: oneOfType([string, array]),
    onChange: func.isRequired,
    options: arrayOf(oneOfType([shape({
      name: string.isRequired,
      value: string.isRequired,
    }), string])),
    optionsQuery: shape({
      QUERY: object.isRequired,
      nameKey: string.isRequired,
      valueKey: string.isRequired,
    })
  }
  render () {
    let { label, value, optionsQuery, name, options, onChange, ...rest } = this.props
    const getSelectBoxWithCorrectedOptions = (options) => {
      let renderOptions = options.map(option => {
          if (!isObject(option)) return <Option key={option} data-value={option}>{option}</Option>
          let key = rest.mode === 'multiple' ? option.name : option.value
          return <Option key={key} data-value={option.value}>{option.name}</Option>
      })
      const handleChange = (value, options) => {
          value = rest.mode === 'multiple'
            ? options.map(option => option.props['data-value'])
            : value
          onChange(null, name, value)
      }
      if (!isEmpty(value)) {
        value = (rest.mode === 'multiple' && isObject(options[0]))
          ? options.filter(option => value.includes(option.value)).map(option => option.name)
          : value
      }
      if (name==="variant"){
      console.log("options", options)
      console.log("value", value)
      }
      return (
        <Form.Item label={label}>
          <Select
            {...rest}
            defaultValue={value}
            onChange={handleChange}
          >
            {renderOptions}
          </Select>
        </Form.Item>
      )
    }
    if (optionsQuery) {
      return <Query query={optionsQuery.QUERY}>
        {({ data, loading }) => {
          if (loading) return null
          let queryData = data[keys(data)[0]]
          let options = queryData.map(qd => ({
            name: qd[optionsQuery.nameKey],
            value: qd[optionsQuery.valueKey]
          }))
          return getSelectBoxWithCorrectedOptions(options)
        }}
      </Query>
    }
    return getSelectBoxWithCorrectedOptions(options) 
  }
}