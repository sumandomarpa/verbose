import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import findIndex from 'lodash/findIndex'

import Layout from '../../Layout'
import PageForm from './PageForm'
import SortableList from './SortableList'
import PageItem from './PageItem'
import { ActionButtonsWrapper, AddNewPageWrapper } from './styles'
import { GET_PAGE, GET_BLOCKS, GET_PAGE_ITEMS } from '../queries'
import { SAVE_PAGE_TO_DB } from '../mutaitons'

class AddPage extends Component {
  handleSubmit = async () => {
    const { client, history } = this.props
    const { page } = client.readQuery({
      query: GET_PAGE,
    })

    const { pageItems } = client.readQuery({
      query: GET_PAGE_ITEMS,
    })

    const { blocks } = client.readQuery({
      query: GET_BLOCKS,
    })

    const trimBlocks = blocks.map(block => {
      const { id, title, content, image, video, style } = block
      return {
        title,
        content,
        image,
        video,
        style,
        order: findIndex(pageItems, pageItem => pageItem.itemId === id),
      }
    })

    const {
      data: { addPage },
    } = await client.mutate({
      mutation: SAVE_PAGE_TO_DB,
      variables: {
        title: page.title,
        slug: page.slug,
        type: page.type,
        vertical: page.vertical,
        blocks: trimBlocks,
      },
    })

    history.push(`/dashboard/pages/edit/${addPage.id}`)
  }

  render() {
    return (
      <Layout>
        <AddNewPageWrapper>
          <Card title="Add New Page">
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

AddPage.propTypes = {
  client: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withApollo(AddPage)
