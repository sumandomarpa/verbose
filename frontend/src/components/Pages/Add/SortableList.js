import React, { Component } from 'react';
import Sortable from 'react-sortablejs';
import { Form, Input, Row, Col, Button, Icon } from 'antd';
import filter from 'lodash/filter'
import uniqueId from 'lodash/uniqueId';
 
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
    const listItems = items.map((val, idx) => (
      <div key={uniqueId()} data-id={idx} style={{background: '#efefef', marginBottom: '20px', padding: '20px'}}> 
        <Row>
          <Col xs={12}>
            {val.type}
          </Col>
          <Col xs={12} style={{ textAlign: 'right' }}>
            <Button type="danger" size="small" onClick={e => this.removeItem(idx)}><Icon type="close" /></Button>
          </Col>
        </Row>
        <Form.Item label="Title">
          <Input type="text" />
        </Form.Item>
      </div>
    ));
    return (
      <div>
          <Sortable
            options={{
              animation: 150,
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