'use client'

import PasswordFormInput from '@/components/form/PasswordFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import { Form } from 'react-bootstrap'
import useSignIn from './useSignIn'

const FormPage = () => {
  const { control, loading, login } = useSignIn()

  return (
    <Form onSubmit={login} className="text-start">
      <TextFormInput name="email" containerClass="mb-3" label="Email" type="email" control={control} />
      <PasswordFormInput name="password" containerClass="mb-4" label="Password" control={control} />
      <button type="submit" className="btn btn-primary w-100 mb-0" disabled={loading}>
        Login
      </button>
    </Form>
  )
}

export default FormPage
