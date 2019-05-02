import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import SelectBox from '../SelectBox'

const GET_USERS = gql`
    {
        users {
            id
            name
        }
    }
`
export default function Authors (props) {
  return (
    <Query query={GET_USERS}>
        {({ data: { users }, loading }) => {
            if (loading) return null
            const { name, value, label, onChange } = props
            let options = users.map(user => ({name: user.name, value: user.id}))
            return (
            <SelectBox mode="multiple" name={name || "authors"} value={value}
                label={label || "Authors"}
                onChange={onChange} options={options} />
            )
        }}
    </Query>
  )
}