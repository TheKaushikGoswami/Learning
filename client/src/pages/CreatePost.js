import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function CreatePost() {

    const initialValues = {
        title: '',
        content: '',
        username: ''
    }

    const validationSchema = Yup.object({
        title: Yup.string().required(),
        content: Yup.string().required(),
        username: Yup.string().min(3).max(15).required()
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className='createPost'>

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form id='createPostForm'>

                    <label className='form-label'>Title: </label>
                    <ErrorMessage name='title' component='span' className='error-span' />
                    <Field type='text' name='title' placeholder='Ex: Title...' />
                    <label className='form-label'>Content: </label>
                    <ErrorMessage name='content' component='span' className='error-span' />
                    <Field as='textarea' name='content' placeholder='Ex: Content...' />
                    <label className='form-label'>Username: </label>
                    <ErrorMessage name='username' component='span' className='error-span' />
                    <Field type='text' name='username' placeholder='Ex: username...' />

                    <button type='submit'>Create Post</button>
                </Form>
            </Formik>

        </div>
    )
}

export default CreatePost
