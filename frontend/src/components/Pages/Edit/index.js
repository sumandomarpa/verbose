import React, { Component } from 'react'
import { Card, Button, message } from 'antd'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import sortBy from 'lodash/sortBy'
import findIndex from 'lodash/findIndex'
import assign from 'lodash/assign'

import Layout from '../../Layout'
import PageForm from '../Add/PageForm'
import SortableList from '../Add/SortableList'
import PageItem from '../Add/AddPageItem'
import { ActionButtonsWrapper, AddNewPageWrapper } from '../Add/styles'
import {
  GET_PAGE_DB,
  GET_PAGE,
  GET_BLOCKS,
  GET_BOXES,
  GET_PROS_AND_CONS,
  GET_PAGE_ITEMS,
} from '../queries'
import { UPDATE_PAGE_TO_DB, UPSERT_PAGE_TO_DB } from '../mutaitons'

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
        type: page.type,
        vertical: page.vertical,
      },
    })

    if (upsertPage.id) {
      message.success('Page updated successfully')
    } else message.error('Error! Page update failed')
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

    const { prosAndCons } = client.readQuery({
      query: GET_PROS_AND_CONS,
    })
    const trimProsAndCons = prosAndCons.map(elem => {
      const data = assign(omit(elem, ['__typename']), {
        order: findIndex(pageItems, pageItem => pageItem.itemId === elem.id),
      })
      data.pros = data.pros.map(elem => omit(elem, ['__typename']))
      data.cons = data.cons.map(elem => omit(elem, ['__typename']))
      return data
    })

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
          prosAndCons: trimProsAndCons,
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
    })

    const pageData = omit(page, ['blocks', 'boxes', 'prosAndCons'])
    const { blocks } = page
    const { boxes } = page
    const { prosAndCons } = page

    const pageItems = []

    const pageItemsMerge = [...blocks, ...boxes, ...prosAndCons]

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
        prosAndCons,
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
                Publish
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
