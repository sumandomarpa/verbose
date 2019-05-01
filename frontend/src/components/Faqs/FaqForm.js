import React, { Component } from 'react'
import { Form } from 'antd'
import isEmpty from 'lodash/isEmpty'
import { withApollo } from 'react-apollo'

import InputBox from '../Generic/InputBox'
import EditorBox from '../Generic/EditorBox'
import SelectBox from '../Generic/SelectBox'
import PublishButton from '../Generic/PublishButton'
import Authors from '../Generic/Authors'
import { VERTICAL_OPTIONS } from '../../constants/common'
import { CURRENT_USER } from './queries'

class FaqForm extends Component {

  constructor (props) {
    super(props)
    const { initialValues = {} } = props 
    this.state = initialValues
  }

  handleInputChange = (e, name, value) => {
    name = name || e.target.name
    value = value || e.target.value
    this.setState({[name]: value})
  }

  handleSubmit = () => {
    const { onSubmit, client } = this.props
    let faq = {...this.state}
    if (isEmpty(faq.authors)) {
      const { me: {id: userId} } = client.readQuery({ query: CURRENT_USER })
      faq.authors = [userId]
    }
    faq.order = parseInt(faq.order)
    onSubmit(faq)
  }

  render() {
    const {
      title,
      description,
      short_description,
      vertical,
      authors,
      slug,
      order
    } = this.state
    return (
      <Form>
        <InputBox name="title" value={title} label="Title"
          onChange={this.handleInputChange} />
        <EditorBox name="description" value={description} label="Description"
          onChange={this.handleInputChange} />
        <InputBox type="textarea" name="short_description" value={short_description} 
          label="Short Description" onChange={this.handleInputChange} />
        <InputBox name="slug" value={slug} label="Slug"
          placeholder="Slug" onChange={this.handleInputChange} />
        <SelectBox name="vertical" value={vertical} label="Vertical"
          onChange={this.handleInputChange} options={VERTICAL_OPTIONS} />
        <Authors name="authors" value={authors} label="Authors"
          onChange={this.handleInputChange} />
        <InputBox type="number" name="order" value={order} label="Order"
          onChange={this.handleInputChange} />
        <PublishButton onClick={this.handleSubmit} />
      </Form>
    )
  }
}

export default withApollo(FaqForm)
