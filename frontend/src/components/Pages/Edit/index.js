import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'

import Layout from '../../Layout'
import PageForm from '../Add/PageForm'
import SortableList from '../Add/SortableList'
import PageItem from '../Add/PageItem'
import { ActionButtonsWrapper, AddNewPageWrapper } from '../Add/styles'
import { GET_PAGE_DB } from '../queries'

class EditPage extends Component {
  async componentDidMount() {
    const {
      match: { params },
      client,
    } = this.props
    const { id } = params

    const {
      data: { page },
    } = await client.query({
      query: GET_PAGE_DB,
      variables: { id },
    })

    const pageData = omit(page, ['blocks'])
    const { blocks } = page
    const pageItems = []

    blocks.forEach(block => {
      const pageItem = {
        type: 'block',
        itemId: block.id,
        pageId: pageData.id,
        __typename: 'PageItem',
      }
      pageItems.push(pageItem)
    })

    client.replaceStore({
      data: {
        page: pageData,
        pageItems,
        blocks,
      },
    })
  }

  handleSubmit = async () => {}

  render() {
    return (
      <Layout>
        <AddNewPageWrapper>
          <Card title="Edit Page">
            <PageForm />
            <SortableList />
            <PageItem />
            <ActionButtonsWrapper>
              <Button type="primary" onClick={this.handleSubmit}>
                Publish
              </Button>
            </ActionButtonsWrapper>
          </Card>
        </AddNewPageWrapper>
      </Layout>
    )
  }
}

EditPage.propTypes = {
  match: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
}

export default withApollo(EditPage)
