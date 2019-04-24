import React, { Component } from 'react'
import { Card, Table, Input, Button, Icon } from 'antd'
import Highlighter from 'react-highlight-words'
import { Query } from 'react-apollo'

import { MediaImage } from './styles'
import { GET_MEDIA_FILES } from '../queries'

class ListMedia extends Component {
  state = {
    searchText: '',
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex] &&
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select())
      }
    },
    render: text => {
      const { searchText } = this.state
      return (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={(text && text.toString()) || ''}
        />
      )
    },
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm()
    this.setState({ searchText: selectedKeys[0] })
  }

  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  render() {
    const columns = [
      {
        title: 'Image',
        key: 'image',
        render: (text, record) => (
          <span>
            <MediaImage src={record.url} alt={record.altText} />
          </span>
        ),
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '30%',
        ...this.getColumnSearchProps('title'),
      },
      {
        title: 'Alt Text',
        dataIndex: 'altText',
        key: 'altText',
        width: '30%',
        ...this.getColumnSearchProps('altText'),
      },
    ]
    return (
      <Query query={GET_MEDIA_FILES}>
        {({ data: { mediaFiles }, loading }) => {
          if (loading) return null
          return (
            <Card title="Media List">
              <Table rowKey="id" columns={columns} dataSource={mediaFiles} />
            </Card>
          )
        }}
      </Query>
    )
  }
}

export default ListMedia
