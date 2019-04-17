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
    addSectionType: 'Block',
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
                <Option value="Block">Block</Option>
                <Option value="Box">Box</Option>
                <Option value="AlertBox">Alert Box</Option>
                <Option value="ProsAndCons">Pros and Cons</Option>
                <Option value="Faq">Faq</Option>
                <Option value="FaqAccordion">Faq Accordion</Option>
                <Option value="QuickTip">Quick Tip</Option>
                <Option value="Grid">Grid</Option>
                <Option value="CaseStudies">Case Studies</Option>
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
