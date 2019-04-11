import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Select } from 'antd'
import { Query, withApollo } from 'react-apollo'

import { SortableActionButtonsWrapper } from './styles'
import { ADD_PAGE_ITEM } from '../mutaitons'
import { GET_PAGE_ITEMS, GET_PAGE } from '../queries'

const { Option } = Select

class PageItem extends Component {
  state = {
    addSectionType: 'block',
  }

  handleAddPageItem = pageId => {
    const { client } = this.props
    const { addSectionType } = this.state

    client.mutate({
      mutation: ADD_PAGE_ITEM,
      variables: {
        type: addSectionType,
        pageId,
      },
      refetchQueries: [
        {
          query: GET_PAGE_ITEMS,
        },
      ],
    })
  }

  render() {
    const { addSectionType } = this.state
    return (
      <Query query={GET_PAGE}>
        {({ data: { page }, loading }) => {
          if (loading) return null
          const { id } = page
          return (
            <SortableActionButtonsWrapper>
              <Select
                defaultValue={addSectionType}
                onChange={addSectionType => this.setState({ addSectionType })}
              >
                <Option value="block">Block</Option>
                <Option value="box">Box</Option>
                <Option value="alert-box">Alert Box</Option>
                <Option value="pros-cons">Pros and Cons</Option>
                <Option value="faq">Faq</Option>
                <Option value="faq-accordion">Faq Accordion</Option>
                <Option value="quick-tip">Quick Tip</Option>
                <Option value="grid">Grid</Option>
                <Option value="case-studies">Case Studies</Option>
              </Select>
              <Button type="default" onClick={() => this.handleAddPageItem(id)}>
                Add Section
              </Button>
            </SortableActionButtonsWrapper>
          )
        }}
      </Query>
    )
  }
}

PageItem.propTypes = {
  client: PropTypes.object.isRequired,
}

export default withApollo(PageItem)
