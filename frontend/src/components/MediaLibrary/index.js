import React, { Component } from 'react'

import Layout from '../Layout'
import AddMedia from './Add'

export default class MediaLibrary extends Component {
  render() {
    return (
      <Layout>
        <AddMedia />
      </Layout>
    )
  }
}
