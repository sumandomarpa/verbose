import React from 'react'

import CreateFormPage from '../Generic/FormPage/Create'
import EditFormPage from '../Generic/FormPage/Edit'
import ListPage from '../Generic/FormPage/List'
import SelectBox from '../Generic/SelectBox'
import EditorBox from '../Generic/EditorBox'
import Authors from '../Generic/Authors'
import { VERTICAL_OPTIONS } from '../../constants/common'
import { UPDATE_FAQ_TO_DB, SAVE_FAQ_TO_DB } from './mutations'
import { GET_FAQ_DB, GET_FAQS_DB } from './queries'

const faqFormFields = [
    { attribute: 'title' },
    { attribute: 'description', Component: EditorBox, id: 'faq' },
    { attribute: 'short_description', type:'textarea' },
    { attribute: 'slug'},
    { attribute: 'vertical', Component: SelectBox, options: VERTICAL_OPTIONS },
    { attribute: 'authors', Component: Authors },
    { attribute: 'order', type: 'number' },
]
const attributes = ['title', 'short_description', 'slug', 'vertical']
const editUrl="/dashboard/faqs/edit"

export function AddFaq ({history}) {
    return (
        <CreateFormPage
            title="Add New Faq"
            saveDataMutation={SAVE_FAQ_TO_DB}
            editUrl={editUrl}
            fields={faqFormFields}
            history={history}
        />
    )
}

export function EditFaq ({match}) {
    return (
        <EditFormPage
            title="Edit Faq"
            updateDataMutation={UPDATE_FAQ_TO_DB}
            getDataQuery={GET_FAQ_DB}
            fields={faqFormFields}
            match={match}
        />
    )
}


export function FaqList () {
    return (
        <ListPage
            getListQuery={GET_FAQS_DB}
            editUrl={editUrl}
            attributes={attributes}
        />
    )
}