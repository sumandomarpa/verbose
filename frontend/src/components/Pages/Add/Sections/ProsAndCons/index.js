import React, { Component, Fragment } from 'react'
import { Form, Input, Row, Col, Button, Icon } from 'antd'
import { Query, withApollo } from 'react-apollo'
import PropTypes from 'prop-types'

import { GET_PROS_AND_CONS_BY_ID } from '../../../queries'
import {
  UPDATE_PROS_AND_CONS,
  ADD_PROS_OR_CONS,
  REMOVE_PROS_OR_CONS,
} from '../../../mutaitons'

class ProsAndCons extends Component {
  handleInputChange = (e, name, value, prosId, consId) => {
    const { client, itemId } = this.props

    client.mutate({
      mutation: UPDATE_PROS_AND_CONS,
      variables: {
        name: name || e.target.name,
        value: value || e.target.value,
        itemId,
        prosId,
        consId,
      },
    })
  }

  addProsOrCons = prosOrCons => {
    const { client, itemId } = this.props
    client.mutate({
      mutation: ADD_PROS_OR_CONS,
      variables: {
        itemId,
        prosOrCons,
      },
      refetchQueries: [
        {
          query: GET_PROS_AND_CONS_BY_ID,
          variables: {
            itemId,
          },
        },
      ],
    })
  }

  removeProsOrCons = prosOrConsId => {
    const { client, itemId } = this.props
    client.mutate({
      mutation: REMOVE_PROS_OR_CONS,
      variables: {
        itemId,
        prosOrConsId,
      },
      refetchQueries: [
        {
          query: GET_PROS_AND_CONS_BY_ID,
          variables: {
            itemId,
          },
        },
      ],
    })
  }

  render() {
    const { itemId } = this.props

    return (
      <Query query={GET_PROS_AND_CONS_BY_ID} variables={{ itemId }}>
        {({ data: { prosAndConsById }, loading }) => {
          if (loading) return null

          const { title, pros, cons } = prosAndConsById

          const renderProsItems = pros.map(item => (
            <Row key={item.id}>
              <Col md={22}>
                <Input
                  name="content"
                  type="text"
                  placeholder="Pros"
                  value={item.content}
                  onChange={e => this.handleInputChange(e, null, null, item.id)}
                />
              </Col>
              <Col md={1}>
                <Button
                  type="danger"
                  onClick={() => this.removeProsOrCons(item.id)}
                >
                  <Icon type="minus" />
                </Button>
              </Col>
            </Row>
          ))
          const renderConsItems = cons.map(item => (
            <Row key={item.id}>
              <Col md={22}>
                <Input
                  name="content"
                  type="text"
                  placeholder="Cons"
                  value={item.content}
                  onChange={e =>
                    this.handleInputChange(e, null, null, null, item.id)
                  }
                />
              </Col>
              <Col md={1}>
                <Button
                  type="danger"
                  onClick={() => this.removeProsOrCons(item.id)}
                >
                  <Icon type="minus" />
                </Button>
              </Col>
            </Row>
          ))

          return (
            <Fragment>
              <Form.Item label="Title">
                <Input
                  name="title"
                  type="text"
                  value={title}
                  onChange={this.handleInputChange}
                />
              </Form.Item>
              <Row>
                <Col md={11}>
                  <Form.Item label="Pros">
                    {renderProsItems}
                    <Button
                      type="primary"
                      onClick={() => this.addProsOrCons('pros')}
                    >
                      Add Pros
                    </Button>
                  </Form.Item>
                </Col>
                <Col md={11} offset={2}>
                  <Form.Item label="Cons">
                    {renderConsItems}
                    <Button
                      type="danger"
                      onClick={() => this.addProsOrCons('cons')}
                    >
                      Add Cons
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

ProsAndCons.propTypes = {
  client: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
}

export default withApollo(ProsAndCons)
