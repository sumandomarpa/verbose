import React from 'react'

import CreateFormPage from '../../Generic/FormPage/Create'
import EditFormPage from '../../Generic/FormPage/Edit'
import EditorBox from '../../Generic/EditorBox'
import { SAVE_FAQ_CATEGORY_TO_DB, UPDATE_FAQ_CATEGORY_TO_DB } from './mutations'
import { GET_FAQ_CATEGORY_DB } from './queries'

const faqCategoriesFormFields = [
    { attribute: 'name' },
    { attribute: 'description', Component: EditorBox, id: 'faqCategory' },
    { attribute: 'slug' },
]
export function AddFaqCategory ({history}) {
    return (
        <CreateFormPage
            title="Add New Faq Category"
            saveDataMutation={SAVE_FAQ_CATEGORY_TO_DB}
            editUrl="/dashboard/faqs/categories/edit"
            fields={faqCategoriesFormFields}
            history={history}
        />
    )
}

export function EditFaqCategory ({match}) {
    return (
        <EditFormPage
            title="Edit Faq Category"
            updateDataMutation={UPDATE_FAQ_CATEGORY_TO_DB}
            getDataQuery={GET_FAQ_CATEGORY_DB}
            fields={faqCategoriesFormFields}
            match={match}
        />
    )
}