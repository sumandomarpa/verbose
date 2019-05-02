import React, { Component } from 'react'
import { Card, Button, message } from 'antd'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import findIndex from 'lodash/findIndex'
import omit from 'lodash/omit'
import assign from 'lodash/assign'

import Layout from '../../Layout'
import PageForm from './PageForm'
import SortableList from './SortableList'
import AddPageItem from './AddPageItem'
import { ActionButtonsWrapper, AddNewPageWrapper } from './styles'
import {
 GET_PAGE,
 GET_BLOCKS,
 GET_PAGE_ITEMS,
 GET_BOXES,
 GET_PROS_AND_CONS,
} from '../queries'
import { SAVE_PAGE_TO_DB, UPSERT_PAGE_TO_DB } from '../mutaitons'

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

   const trimBlocks = blocks.map(block =>
     assign(omit(block, ['id', '__typename']), {
       order: findIndex(pageItems, pageItem => pageItem.itemId === block.id),
     })
   )

   const { boxes } = client.readQuery({
     query: GET_BOXES,
   })

   const trimBoxes = boxes.map(box =>
     assign(omit(box, ['id', '__typename']), {
       order: findIndex(pageItems, pageItem => pageItem.itemId === box.id),
     })
   )

   const { prosAndCons } = client.readQuery({
     query: GET_PROS_AND_CONS,
   })

   const trimProsAndCons = prosAndCons.map(box => {
     const data = assign(omit(box, ['id', '__typename']), {
       order: findIndex(pageItems, pageItem => pageItem.itemId === box.id),
     })
     data.pros = data.pros.map(elem => omit(elem, ['id', '__typename']))
     data.cons = data.cons.map(elem => omit(elem, ['id', '__typename']))
     return data
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
       boxes: trimBoxes,
       prosAndCons: trimProsAndCons,
     },
   })

   history.push(`/dashboard/pages/edit/${addPage.id}`)
 }

  upsertPage = async () => {
    const { client, history } = this.props
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
      message.success('Page Created Successfully')
      history.push(`/dashboard/pages/edit/${upsertPage.id}`)
    } else message.error('Error: Failed to create a page')
  }

  render() {
    return (
      <Layout>
        <AddNewPageWrapper>
          <Card title="Add New Page">
            <PageForm upsertPage={this.upsertPage} />
            <SortableList />
            <AddPageItem />
            <ActionButtonsWrapper>
              <Button type="primary" onClick={this.upsertPage}>
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
