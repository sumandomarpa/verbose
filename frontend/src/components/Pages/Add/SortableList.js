import React, { Component } from 'react'
import Sortable from 'react-sortablejs'
import { Row, Col, Button, Icon } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import filter from 'lodash/filter'
import uniqueId from 'lodash/uniqueId'
import { Query, withApollo } from 'react-apollo'

import Block from './Sections/Block'
import ProsCons from './Sections/ProsCons'
import Faq from './Sections/Faq'
import FaqAccordion from './Sections/FaqAccordion'
import Grid from './Sections/Grid'
import { GET_PAGE_ITEMS_BY_PAGE_ID } from '../queries'
import { ORDER_PAGE_ITEMS } from '../mutaitons'

const SortableListWrapper = styled.div`
  .editorClassName {
    min-height: 200px;
    border: 1px solid #f1f1f1;
    background: white;
  }
  .ant-form-item {
    margin-bottom: 0px;
  }
`

class SortableList extends Component {
  static propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
    updateItems: PropTypes.func,
  }

  removeItem = orderKey => {
    const { items, updateItems } = this.props
    const removedItems = filter(items, item => item.orderKey !== orderKey)
    updateItems(removedItems)
  }

  renderSection = (type, props) => {
    switch (type) {
      case 'block':
        return <Block {...props} />
      case 'pros-cons':
        return <ProsCons {...props} />
      case 'faq':
        return <Faq {...props} />
      case 'faq-accordion':
        return <FaqAccordion {...props} />
      case 'grid':
        return <Grid {...props} />
      default:
        return null
    }
  }

  handleSortChange = itemIds => {
    const { client, pageId } = this.props

    client.mutate({
      mutation: ORDER_PAGE_ITEMS,
      variables: {
        itemIds,
      },
      refetchQueries: [
        {
          query: GET_PAGE_ITEMS_BY_PAGE_ID,
          variables: {
            pageId,
          },
        },
      ],
    })
  }

  render() {
    const { pageId } = this.props
    return (
      <Query query={GET_PAGE_ITEMS_BY_PAGE_ID} variables={{ pageId }}>
        {({ data: { pageItems }, loading }) => {
          if (loading) return null
          const listItems = pageItems.map(item => (
            <SortableListWrapper
              key={uniqueId()}
              data-id={item.itemId}
              style={{
                background: '#fbfbfb',
                marginBottom: '20px',
                padding: '20px',
                border: '1px solid #eee',
              }}
            >
              <Row className="subsection-header" style={{ cursor: 'move' }}>
                <Col xs={12}>{item.type}</Col>
                <Col xs={12} style={{ textAlign: 'right' }}>
                  <Button
                    type="danger"
                    size="small"
                    onClick={() => this.removeItem(item.itemId)}
                  >
                    <Icon type="close" />
                  </Button>
                </Col>
              </Row>
              {this.renderSection(item.type, item)}
            </SortableListWrapper>
          ))

          return (
            <div>
              <Sortable
                options={{
                  animation: 150,
                  handle: '.subsection-header',
                }}
                tag="div"
                onChange={itemIds => this.handleSortChange(itemIds)}
              >
                {listItems}
              </Sortable>
            </div>
          )
        }}
      </Query>
    )
  }
}

SortableList.propTypes = {
  pageId: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired,
}

export default withApollo(SortableList)
