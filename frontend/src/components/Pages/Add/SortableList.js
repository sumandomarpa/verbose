import React, { Component } from 'react';
import Sortable from 'react-sortablejs';
import { Row, Col, Button, Icon } from 'antd';
import filter from 'lodash/filter'
import uniqueId from 'lodash/uniqueId';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components'

import Block from './Sections/Block';

const Types = {
  'block': <Block />,
}

const SortableListWrapper = styled.div`
  .editorClassName {
    min-height: 200px;
    border: 1px solid #F1F1F1;
    background: white;
  }
  .ant-form-item {
    margin-bottom: 0px;
  }
`

export default class SortableList extends Component {
  removeItem(idx) {
    const { items, onChange } = this.props
    const removedItems = filter(items, (obj, currentIdx) => {
      return currentIdx !== idx
    })
    onChange(removedItems)
  }
  render () {
    const { onChange, items } = this.props
    const listItems = items.map((item, idx) => (
      <SortableListWrapper key={uniqueId()} data-id={idx} style={{background: '#fbfbfb', marginBottom: '20px', padding: '20px', border: '1px solid #eee'}}> 
        <Row className="subsection-header" style={{ cursor: 'move' }}>
          <Col xs={12}>
            {item.type}
          </Col>
          <Col xs={12} style={{ textAlign: 'right' }}>
            <Button type="danger" size="small" onClick={e => this.removeItem(idx)}><Icon type="close" /></Button>
          </Col>
        </Row>
        {Types[item.type]}
      </SortableListWrapper>
    ));
    return (
      <div>
          <Sortable
            options={{
              animation: 150,
              handle: '.subsection-header',
            }}
            tag="div"
            onChange={(order, sortable, evt) => {
              onChange(order);
            }}
          >
            {listItems}
          </Sortable>
      </div>
    );
  }
}
