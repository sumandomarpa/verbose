import uniqueId from 'lodash/uniqueId';
import React from 'react';
import Sortable from 'react-sortablejs';
import { Form, Input } from 'antd';
 
// Functional Component
const SortableList = ({ items, onChange }) => {
    let sortable = null; // sortable instance
    const reverseOrder = (evt) => {
        const order = sortable.toArray();
        onChange(order.reverse());
    };
    const listItems = items.map(val => (
      <div key={uniqueId()} data-id={val} style={{background: '#efefef', marginBottom: '20px', padding: '20px'}}>
        List Item: {val}

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
              ref={(c) => {
                if (c) {
                  sortable = c.sortable;
                }
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
};
 
export default SortableList;