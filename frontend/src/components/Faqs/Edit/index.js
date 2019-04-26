import React, { Component } from 'react'
import { Card } from 'antd'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'

import Layout from '../../Layout'
import PublishButton from '../../Generic/PublishButton'
import FaqForm from '../FaqForm';
import { UPDATE_FAQ_TO_DB } from '../mutations'
import { GET_FAQ , GET_FAQ_DB} from '../queries'

const CURRENT_USER = gql`
  query {
    me @client {
      id
    }
  }
`

class EditFaq extends Component {
  componentDidMount () {
    this.fetchFromDBtoCache()
  }

  handleSubmit = async () => {
    const { client } = this.props
    const { faq } = client.readQuery({ query: GET_FAQ })
    const { me: {id: userId} } = client.readQuery({ query: CURRENT_USER })
    let variables = { ...faq, order: parseInt(faq.order), authors: [userId]}
    try {
      const { data: { updateFaq }} = await client.mutate({
        mutation: UPDATE_FAQ_TO_DB,
        variables 
      })
      if (updateFaq.id) {
        console.log('updated successfully')
        this.fetchFromDBtoCache()
      }
    } catch (e) {
      console.log('update failed')
    }
  }

  fetchFromDBtoCache = async () => {
    const {
      match: { params },
      client,
    } = this.props
    const { id } = params
    const { data: { faq } } = await client.query({
      query:GET_FAQ_DB,
      variables: {id}
    })
    client.replaceStore({
      data: {
        faq,
      },
    })
  }

  render() {
    return (
      <Layout>
        <Card title="Edit FAQ">
          <FaqForm />
          <PublishButton onClick={this.handleSubmit} />
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
