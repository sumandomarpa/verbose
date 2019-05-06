import React, { Component } from 'react'
import { Card, message } from 'antd'
import keys from 'lodash/keys'
import { withApollo } from 'react-apollo'
import { object, string, array } from 'prop-types'

import Layout from '../../Layout'
import DataForm from '../DataForm'

class EditFormPage extends Component {
  static propTypes = {
      updateDataMutation: object.isRequired,
      getDataQuery: object.isRequired,
      title: string,
      fields: array.isRequired,
      match: object.isRequired,
  }
  state = {
      loaded: false
  }
  componentDidMount () {
    const { client, match: {params : {id}}, getDataQuery, fields } = this.props
    client.query({ query: getDataQuery, variables: {id} }).then(({ data }) => {
      let formData = data[keys(data)[0]]
      fields.forEach(element => {
        if (element.optionsQuery) {
          formData[element.attribute] = formData[element.attribute].map(
            e => e[element.optionsQuery.valueKey || 'id']
          )
        }
      })
      this.setState({formData, loaded: true})
    })
  } 
  handleSubmit = (fields) => {
    const { client, title, updateDataMutation } = this.props
    client.mutate({
      mutation: updateDataMutation,
      variables: fields
    }).then(() => {
        message.success(`${title} Success!`)
    })
  }
  render() {
    const { title, fields } = this.props
    const { loaded, formData } = this.state
    return (
      <Layout>
        <Card title={title}>
          {loaded && <DataForm initialValues={formData} fields={fields} onSubmit={this.handleSubmit}/>}
        </Card>
      </Layout>
    )
  }
}

export default withApollo(EditFormPage)
