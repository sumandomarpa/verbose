import React from 'react'

import CreateFormPage from '../../Generic/FormPage/Create'
import EditFormPage from '../../Generic/FormPage/Edit'
import ListPage from '../../Generic/FormPage/List'
import EditorBox from '../../Generic/EditorBox'
import { SAVE_FAQ_CATEGORY_TO_DB, UPDATE_FAQ_CATEGORY_TO_DB } from './mutations'
import { GET_FAQ_CATEGORY_DB, GET_FAQ_CATEGORIES_DB } from './queries'

const renderCountOfFaqs = (record) => <span>{record.faqs.length}</span>

const faqCategoriesFormFields = [
    { attribute: 'name' },
    { attribute: 'description', Component: EditorBox, id: 'faqCategory' },
    { attribute: 'slug' },
]

const attributes = ['name', 'description', 'slug']

const editUrl="/dashboard/faqs/categories/edit"

const customColumns = [{attribute: 'count', render: renderCountOfFaqs}]

export function AddFaqCategory ({history}) {
    return (
        <CreateFormPage
            title="Add New Faq Category"
            saveDataMutation={SAVE_FAQ_CATEGORY_TO_DB}
            editUrl={editUrl}
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


export function FaqCategoryList () {
    return (
        <ListPage
            customColumns={customColumns}
            getListQuery={GET_FAQ_CATEGORIES_DB}
            editUrl={editUrl}
            attributes={attributes}
        />
    )
}