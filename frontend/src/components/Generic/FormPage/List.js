import React from 'react'
import { Query } from 'react-apollo'
import keys from 'lodash/keys'

import DataTable from '../../Generic/DataTable'
import Layout from '../../Layout'
import { object } from 'prop-types'

export default class ListPage extends React.Component {
    static propTypes = {
        getListQuery: object.isRequired,
    }
    render () {
        const { getListQuery, ...rest } = this.props
        return (
            <Query query={getListQuery} fetchPolicy="network-only">
                {({ data , loading }) => {
                    if (loading) return null
                    const listData = data[keys(data)[0]]
                    return (
                        <Layout>
                            <DataTable
                                data={listData}
                                {...rest}
                            />
                        </Layout>
                    )
                }}
            </Query>
        )
    }
}