import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Query, withApollo } from 'react-apollo'

import { GET_FAQ } from './queries'
import { UPDATE_FAQ } from './mutations'
import InputBox from '../Generic/InputBox'
import EditorBox from '../Generic/EditorBox'
import SelectBox from '../Generic/SelectBox'
import { VERTICAL_OPTIONS } from '../../constants/common'

class FaqForm extends Component {
  handleInputChange = (faqId, e, name, value) => {
    const { client } = this.props
    client.mutate({
      mutation: UPDATE_FAQ,
      variables: {  
        name: name || e.target.name,
        value: value || e.target.value,
        faqId,
      },
    })
  }

  render() {
    return (
      <Query query={GET_FAQ}>
        {({ data: { faq }, loading }) => {
          if (loading) return null
          const {
            id,
            title,
            description,
            short_description,
            vertical,
            slug,
            order
          } = faq
          return (
            <Fragment>
              <InputBox name="title" value={title} label="Title" id={id}
                onChange={this.handleInputChange} />
              <EditorBox name="description" value={description} label="Description" id={id}
                onChange={this.handleInputChange} />
              <InputBox type="textarea" name="short_description" value={short_description} 
                label="Short Description" id={id} onChange={this.handleInputChange} />
              <InputBox name="slug" value={slug} label="Slug" id={id}
                placeholder="Slug" onChange={this.handleInputChange} />
              <SelectBox name="vertical" value={vertical} label="Vertical" id={id}
                onChange={this.handleInputChange} options={VERTICAL_OPTIONS} />
              <InputBox type="number" name="order" value={order} label="Order" id={id}
                onChange={this.handleInputChange} />
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

FaqForm.propTypes = {
  client: PropTypes.object.isRequired,
}

export default withApollo(FaqForm)
