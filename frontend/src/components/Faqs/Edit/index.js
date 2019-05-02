import React, { Component } from 'react'
import { Card } from 'antd'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'

import Layout from '../../Layout'
import FaqForm from '../FaqForm';
import { UPDATE_FAQ_TO_DB } from '../mutations'
import { GET_FAQ_DB } from '../queries'

class EditFaq extends Component {
  state = {
    loaded: false
  }
  componentDidMount () {
    const { client, match: {params : {id}} } = this.props
    client.query({ query: GET_FAQ_DB, variables: {id} }).then(({ data: {faq}}) => {
      faq.authors = faq.authors.map(e => e.id)
      this.setState({faq, loaded: true})
    })
  }
  handleSubmit = async (faq) => {
    const { client } = this.props
    try {
      client.mutate({
        mutation: UPDATE_FAQ_TO_DB,
        variables: faq
      })
    } catch (e) {
      console.log('update failed')
    }
  }

  render() {
    const { faq, loaded } = this.state
    return (
      <Layout>
        <Card title="Edit FAQ">
          {loaded && <FaqForm initialValues={faq} onSubmit={this.handleSubmit}/>}
        </Card>
      </Layout>
    )
  }
}

EditFaq.propTypes = {
  client: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default withApollo(EditFaq)