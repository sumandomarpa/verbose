import React, { Component } from 'react'
import { Card, Button, message } from 'antd'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import sortBy from 'lodash/sortBy'

import Layout from '../../Layout'
import PageForm from '../Add/PageForm'
import SortableList from '../Add/SortableList'
import PageItem from '../Add/AddPageItem'
import { ActionButtonsWrapper, AddNewPageWrapper } from '../Add/styles'
import { GET_PAGE_DB, GET_PAGE } from '../queries'
import { UPSERT_PAGE_TO_DB } from '../mutaitons'

class EditPage extends Component {
  state = { loading: false }

  componentDidMount() {
    this.fetchFromDBtoCache()
  }

  upsertPage = async () => {
    const { client } = this.props
    const { page } = client.readQuery({
      query: GET_PAGE,
    })

    const {
      data: { upsertPage },
    } = await client.mutate({
      mutation: UPSERT_PAGE_TO_DB,
      variables: {
        id: page.id,
        title: page.title,
        slug: page.slug,
        media: page.media && page.media.id,
        type: page.type,
        vertical: page.vertical,
        status: page.status,
      },
    })

    if (upsertPage.id) {
      message.success('Page updated successfully')
    } else message.error('Error! Page update failed')
  }

  async fetchFromDBtoCache() {
    this.setState({ loading: true })
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
      fetchPolicy: 'network-only',
    })

    const pageData = omit(page, [
      'blocks',
      'boxes',
      'prosAndCons',
      'alertBoxes',
      'quickTips',
    ])

    const { blocks } = page
    const { boxes } = page
    const { prosAndCons } = page
    const { quickTips } = page
    const { alertBoxes } = page

    const pageItems = []
    const pageItemsMerge = [
      ...blocks,
      ...boxes,
      ...prosAndCons,
      ...alertBoxes,
      ...quickTips,
    ]
    sortBy(pageItemsMerge, ['order']).forEach(item => {
      const pageItem = {
        type: item.__typename,
        itemId: item.id,
        pageId: page.id,
        __typename: 'PageItem',
      }
      pageItems.push(pageItem)
    })

    client.replaceStore({
      data: {
        page: pageData,
        pageItems,
        blocks,
        boxes,
        alertBoxes,
        prosAndCons,
        quickTips,
      },
    })

    if (page) {
      this.setState({ loading: false })
    }
  }

  render() {
    const { loading } = this.state
    return !loading ? (
      <Layout>
        <AddNewPageWrapper>
          <Card title="Edit Page">
            <PageForm upsertPage={this.upsertPage} />
            <SortableList />
            <PageItem />
            <ActionButtonsWrapper>
              <Button type="primary" onClick={this.upsertPage}>
                Update Page
              </Button>
            </ActionButtonsWrapper>
          </Card>
        </AddNewPageWrapper>
      </Layout>
    ) : null
  }
}

EditPage.propTypes = {
  match: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
}

export default withApollo(EditPage)
