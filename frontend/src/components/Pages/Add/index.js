import React, { Component } from 'react'
import { Card, Button } from 'antd'

import Layout from '../../Layout'
import PageForm from './PageForm'
import SortableList from './SortableList'
import PageItem from './PageItem'
import { ActionButtonsWrapper, AddNewPageWrapper } from './styles'

class AddPage extends Component {
  render() {
    return (
      <Layout>
        <AddNewPageWrapper>
          <Card title="Add New Page">
            <PageForm />
            <SortableList />
            <PageItem />
            <ActionButtonsWrapper>
              <Button type="primary" htmlType="submit">
                Publish
              </Button>
            </ActionButtonsWrapper>
          </Card>
        </AddNewPageWrapper>
      </Layout>
    )
  }
}

export default AddPage
