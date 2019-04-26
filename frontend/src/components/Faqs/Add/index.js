import React, { Component } from 'react'
import { Card } from 'antd'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'

import Layout from '../../Layout'
import PublishButton from '../../Generic/PublishButton'
import FaqForm from '../FaqForm';
import { SAVE_FAQ_TO_DB } from '../mutations'
import { GET_FAQ } from '../queries'

const CURRENT_USER = gql`
  query {
    me @client {
      id
    }
  }
`

class AddFaq extends Component {
  handleSubmit = async () => {
    const { client, history } = this.props
    const { faq } = client.readQuery({ query: GET_FAQ })
    const { me: {id: userId} } = client.readQuery({ query: CURRENT_USER })
    let variables = { ...faq, order: parseInt(faq.order), authors: [userId]}
    const { data: { addFaq }} = await client.mutate({
      mutation: SAVE_FAQ_TO_DB,
      variables 
    })
    history.push(`/dashboard/faqs/edit/${addFaq.id}`)
  }

  render() {
    return (
      <Layout>
        <Card title="Add New FAQ">
          <FaqForm />
          <PublishButton onClick={this.handleSubmit} />
        </Card>
      </Layout>
    )
  }
}

AddFaq.propTypes = {
  client: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withApollo(AddFaq)
