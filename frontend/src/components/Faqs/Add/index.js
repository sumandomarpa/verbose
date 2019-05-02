import React, { Component } from 'react'
import { Card } from 'antd'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'

import Layout from '../../Layout'
import FaqForm from '../FaqForm';
import { SAVE_FAQ_TO_DB } from '../mutations'

class AddFaq extends Component {
  handleSubmit = async (faq) => {
    const { client, history } = this.props
    const { data: { addFaq }} = await client.mutate({
      mutation: SAVE_FAQ_TO_DB,
      variables: faq
    })
    history.push(`/dashboard/faqs/edit/${addFaq.id}`)
  }

  render() {
    return (
      <Layout>
        <Card title="Add New FAQ">
          <FaqForm onSubmit={this.handleSubmit}/>
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
