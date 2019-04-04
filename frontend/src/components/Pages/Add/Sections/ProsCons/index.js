import React, { Component, Fragment } from 'react'
import { Form, Input, Row, Col, Button, Icon } from 'antd'
import pullAt from 'lodash/pullAt'

export default class ProsCons extends Component {
  state = { title: '', pros: [{ value: '' }], cons: [{ value: '' }] }

  addPros = () => {
    const { pros } = this.state
    pros.push({ value: '' })
    this.setState({ pros })
  }

  addCons = () => {
    const { cons } = this.state
    cons.push({ value: '' })
    this.setState({ cons })
  }

  updatePros = (value, idx) => {
    const { pros } = this.state
    pros[idx] = { value }
    this.setState({ pros })
  }

  updateCons = (value, idx) => {
    const { cons } = this.state
    cons[idx] = { value }
    this.setState({ cons })
  }

  removePros = idx => {
    const { pros } = this.state
    pullAt(pros, idx)
    this.setState({ pros })
  }

  removeCons = idx => {
    const { cons } = this.state
    pullAt(cons, idx)
    this.setState({ cons })
  }

  handleTitleChange = e => {
    e.preventDefault()
    this.setState({ title: e.target.value })
  }

  render() {
    const { title, pros, cons } = this.state
    const renderProsItems = pros.map((item, idx) => (
      <Row key={idx}>
        <Col md={22}>
          <Input
            type="text"
            placeholder="Pros"
            value={item.value}
            onChange={e => this.updatePros(e.target.value, idx)}
          />
        </Col>
        <Col md={1}>
          <Button type="danger" onClick={() => this.removePros(idx)}>
            <Icon type="minus" />
          </Button>
        </Col>
      </Row>
    ))
    const renderConsItems = cons.map((item, idx) => (
      <Row key={idx}>
        <Col md={22}>
          <Input
            type="text"
            placeholder="Cons"
            value={item.value}
            onChange={e => this.updateCons(e.target.value, idx)}
          />
        </Col>
        <Col md={1}>
          <Button type="danger" onClick={() => this.removeCons(idx)}>
            <Icon type="minus" />
          </Button>
        </Col>
      </Row>
    ))
    return (
      <Fragment>
        <Form.Item label="Title">
          <Input type="text" value={title} onChange={this.handleTitleChange} />
        </Form.Item>
        <Row>
          <Col md={11}>
            <Form.Item label="Pros">
              {renderProsItems}
              <Button type="primary" onClick={this.addPros}>
                Add Pros
              </Button>
            </Form.Item>
          </Col>
          <Col md={11} offset={2}>
            <Form.Item label="Cons">
              {renderConsItems}
              <Button type="danger" onClick={this.addCons}>
                Add Cons
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
