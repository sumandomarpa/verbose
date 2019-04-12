import React, { Component } from 'react'
import Sortable from 'react-sortablejs'
import { Row, Col, Button, Icon } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import uniqueId from 'lodash/uniqueId'
import { Query, withApollo } from 'react-apollo'

import Block from './Sections/Block'
import ProsCons from './Sections/ProsCons'
import Faq from './Sections/Faq'
import FaqAccordion from './Sections/FaqAccordion'
import Grid from './Sections/Grid'
import { GET_PAGE_ITEMS } from '../queries'
import { ORDER_PAGE_ITEMS, REMOVE_PAGE_ITEM } from '../mutaitons'

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
  }

  state = { loading: false }

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
    const { client } = this.props

    client.mutate({
      mutation: ORDER_PAGE_ITEMS,
      variables: {
        itemIds,
      },
      refetchQueries: [
        {
          query: GET_PAGE_ITEMS,
        },
      ],
    })
  }

  removeItem = itemId => {
    const { client } = this.props
    this.setState({ loading: true })
    client
      .mutate(
        {
          mutation: REMOVE_PAGE_ITEM,
          variables: {
            itemId,
          },
        },
        () => console.log('after data')
      )
      .then(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    const { loading } = this.state
    return !loading ? (
      <Query query={GET_PAGE_ITEMS}>
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
    ) : null
  }
}

SortableList.propTypes = {
  client: PropTypes.object.isRequired,
}

export default withApollo(SortableList)
