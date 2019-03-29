import React, { Component, Fragment } from 'react'
import { Form, Input, Row, Col, Button, Icon } from 'antd';

export default class ProsCons extends Component{
  state = { pros: [{value: 'first pros'}], cons: [{value: 'first cons'}]}
  render () {
    const { pros, cons } = this.state

    const renderProsItems = pros.map((item, idx) => (
      <Row key={idx}>
        <Col md={22}>
          <Input type="text" placeholder="Pros" value={item.value}/>
        </Col>
        <Col md={1}>
        <Button type="danger"><Icon type="minus" /></Button>
        </Col>
      </Row>
    ))

    const renderConsItems = cons.map((item, idx) => (
      <Row key={idx}>
        <Col md={22}>
          <Input type="text" placeholder="Cons" value={item.value} />
        </Col>
        <Col md={1}>
        <Button type="danger"><Icon type="minus" /></Button>
        </Col>
      </Row>
    ))
    return (
      <Fragment>
        <Form.Item label="Title">
          <Input type="text" />
        </Form.Item>
    
        <Row>
          <Col md={11}>
            <Form.Item label="Pros">
              {renderProsItems}
              <Button type="primary">Add Pros</Button>
            </Form.Item>
          </Col>
          <Col md={11} offset={2}>
            <Form.Item label="Cons">
              {renderConsItems}
              <Button type="danger">Add Cons</Button>
            </Form.Item>
          </Col>
        </Row>
      </Fragment>
    )
  }
} 
