import React from 'react'
import { Query } from 'react-apollo'

import DataTable from '../Generic/DataTable'
import { GET_FAQS_DB } from './queries'
import Layout from '../Layout'

export default class FaqList extends React.Component {
    render () {
        return (
            <Query query={GET_FAQS_DB} fetchPolicy="network-only">
                {({ data: { faqs }, loading }) => {
                    if (loading) return null
                    const attributes = ['title', 'short_description', 'slug', 'vertical']
                    return (
                        <Layout>
                            <DataTable
                                data={faqs}
                                attributes={attributes}
                                editUrl="/dashboard/faqs/edit"
                            />
                        </Layout>
                    )
                }}
            </Query>
        )
    }
}