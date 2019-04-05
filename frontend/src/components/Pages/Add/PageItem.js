import React, { Component } from 'react'
import { Button, Select } from 'antd'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { SortableActionButtonsWrapper } from './styles'

const { Option } = Select

export const ADD_PAGE_ITEM = gql`
  mutation AddPageItem($type: String!) {
    addPageItem(type: $type) @client
  }
`

class PageItem extends Component {
  state = {
    addSectionType: 'block',
  }

  render() {
    const { addSectionType } = this.state

    return (
      <Mutation mutation={ADD_PAGE_ITEM} variables={{ type: addSectionType }}>
        {(addPage, { error, loading }) => (
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
            <Button
              type="default"
              onClick={() => {
                addPage()
              }}
            >
              Add Section
            </Button>
          </SortableActionButtonsWrapper>
        )}
      </Mutation>
    )
  }
}

export default PageItem
