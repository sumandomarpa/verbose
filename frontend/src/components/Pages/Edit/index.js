import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import sortBy from 'lodash/sortBy'
import findIndex from 'lodash/findIndex'
import assign from 'lodash/assign'
import { lowerCase } from 'change-case'

import Layout from '../../Layout'
import PageForm from '../Add/PageForm'
import SortableList from '../Add/SortableList'
import PageItem from '../Add/PageItem'
import { ActionButtonsWrapper, AddNewPageWrapper } from '../Add/styles'
import {
  GET_PAGE_DB,
  GET_PAGE,
  GET_BLOCKS,
  GET_BOXES,
  GET_PAGE_ITEMS,
} from '../queries'
import { UPDATE_PAGE_TO_DB } from '../mutaitons'

class EditPage extends Component {
  componentDidMount() {
    this.fetchFromDBtoCache()
  }

  handleSubmit = async () => {
    const { client } = this.props
    const { page } = client.readQuery({
      query: GET_PAGE,
    })

    const { pageItems } = client.readQuery({
      query: GET_PAGE_ITEMS,
    })

    const { blocks } = client.readQuery({
      query: GET_BLOCKS,
    })
    const trimBlocks = blocks.map(block =>
      assign(omit(block, ['__typename']), {
        order: findIndex(pageItems, pageItem => pageItem.itemId === block.id),
      })
    )

    const { boxes } = client.readQuery({
      query: GET_BOXES,
    })
    const trimBoxes = boxes.map(box =>
      assign(omit(box, ['__typename']), {
        order: findIndex(pageItems, pageItem => pageItem.itemId === box.id),
      })
    )

    try {
      const {
        data: { updatePage },
      } = await client.mutate({
        mutation: UPDATE_PAGE_TO_DB,
        variables: {
          id: page.id,
          title: page.title,
          slug: page.slug,
          type: page.type,
          vertical: page.vertical,
          blocks: trimBlocks,
          boxes: trimBoxes,
        },
      })
      if (updatePage.id) {
        console.log('updated successfully')
        this.fetchFromDBtoCache()
      }
    } catch (e) {
      console.log('update failed')
    }
  }

  async fetchFromDBtoCache() {
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
    const { boxes } = page
    const pageItems = []

    const pageItemsMerge = [...blocks, ...boxes]

    sortBy(pageItemsMerge, ['order']).forEach(item => {
      const pageItem = {
        type: lowerCase(item.__typename),
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
      },
    })
  }

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