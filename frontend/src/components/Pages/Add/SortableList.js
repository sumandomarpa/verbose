import React, { Component } from 'react'
import Sortable from 'react-sortablejs'
import { Row, Col, Button, Icon } from 'antd'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import filter from 'lodash/filter'
import uniqueId from 'lodash/uniqueId'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'

import Block from './Sections/Block'
import ProsCons from './Sections/ProsCons'

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

export const GET_PAGE_ITEMS = gql`
  {
    pageItems @client {
      type
      orderKey
    }
  }
`

export const ORDER_PAGE_ITEMS = gql`
  mutation OrderPageItems($orderKeys: [String]!) {
    orderPageItems(orderKeys: $orderKeys) @client
  }
`

export default class SortableList extends Component {
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

  renderSection = (type, handleBlockItemChange) => {
    switch (type) {
      case 'block':
        return <Block handleBlockItemChange={handleBlockItemChange} />
      case 'pros-cons':
        return <ProsCons />
      default:
        return null
    }
  }

  render() {
    const { handleBlockItemChange } = this.props
    return (
      <Mutation mutation={ORDER_PAGE_ITEMS} variables={{ orderKeys: [] }}>
        {(orderPageItems, { error, loading }) => (
          <Query query={GET_PAGE_ITEMS}>
            {({ data: { pageItems } }) => {
              const listItems = pageItems.map(item => (
                <SortableListWrapper
                  key={uniqueId()}
                  data-id={item.orderKey}
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
                        onClick={() => this.removeItem(item.orderKey)}
                      >
                        <Icon type="close" />
                      </Button>
                    </Col>
                  </Row>
                  {this.renderSection(item.type, handleBlockItemChange)}
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
                    onChange={orderKeys => {
                      orderPageItems({
                        variables: {
                          orderKeys,
                        },
                      })
                    }}
                  >
                    {listItems}
                  </Sortable>
                </div>
              )
            }}
          </Query>
        )}
      </Mutation>
    )
  }
}
