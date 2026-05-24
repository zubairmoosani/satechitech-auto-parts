'use client'
import PasswordFormInput from '@/components/form/PasswordFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import { currentYear, developedByLink } from '@/states'
import Link from 'next/link'
import { Form } from 'react-bootstrap'
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import useSignIn from './useSignIn'

const FormPage = () => {
  const { control, loading, login } = useSignIn()

  return (
    <>
      <Form onSubmit={login} className="mt-4 text-start">
        <TextFormInput name="email" containerClass="mb-3" label="Enter email id" type="email" control={control} />
        <PasswordFormInput name="password" containerClass="mb-3" label="Enter password" control={control} />
        <div className="mb-3 d-sm-flex justify-content-between">
          <div className="d-flex gap-1">
            <input type="checkbox" className="form-check-input" id="rememberCheck" />
            <label className="form-check-label" htmlFor="rememberCheck">
              Remember me?
            </label>
          </div>
          <Link href="/auth/forget-pass">Forgot password?</Link>
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mb-0" disabled={loading}>
            Login
          </button>
        </div>
        <div className="position-relative my-4">
          <hr />
          <p className="small bg-mode position-absolute top-50 start-50 translate-middle px-2">Or sign in with</p>
        </div>

        <div className="vstack gap-3">
          <button type="button" className="btn btn-light mb-0">
            <FcGoogle size={16} className="fab fa-fw me-2" />
            Continue with Google
          </button>
          <button type="button" className="btn btn-light mb-0">
            <FaFacebookF size={16} className="fab fa-fw text-facebook me-2" />
            Continue with Facebook
          </button>
        </div>

        <div className="text-primary-hover text-body mt-3 text-center">
          Copyrights ©{currentYear} Booking. Build by&nbsp;
          <Link href={developedByLink} target="_blank" className="text-body">
            StackBros
          </Link>
          .
        </div>
      </Form>
    </>
  )
}

export default FormPage
