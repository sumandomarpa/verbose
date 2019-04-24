import React, { Component } from 'react'

import Layout from '../Layout'
import AddMedia from './Add'
import ListMedia from './List'
import { ListMediaWrapper } from './styles'

export default class MediaLibrary extends Component {
  render() {
    return (
      <Layout>
        <AddMedia />
        <ListMediaWrapper>
          <ListMedia />
        </ListMediaWrapper>
      </Layout>
    )
  }
}
