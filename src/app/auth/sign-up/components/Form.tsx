'use client'
import PasswordFormInput from '@/components/form/PasswordFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import { currentYear, developedByLink } from '@/states'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import * as yup from 'yup'

type SignUpFormValues = {
  email: string
  password: string
  confirmPassword?: string
}

const Form = () => {
  const signUpFormSchema: yup.ObjectSchema<SignUpFormValues> = yup.object({
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], "Password and confirm password doesn't match"),
  })

  const { control, handleSubmit } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  return (
    <>
      <form onSubmit={handleSubmit(() => {})} className="mt-4 text-start">
        <TextFormInput name="email" containerClass="mb-3" label="Enter email id" type="email" control={control} />

        <PasswordFormInput name="password" containerClass="mb-3" label="Enter password" control={control} />

        <PasswordFormInput name="confirmPassword" containerClass="mb-3" label="Confirm password" control={control} />

        <div className="mb-3">
          <input type="checkbox" className="form-check-input me-1" id="rememberCheck" />
          <label className="form-check-label" htmlFor="rememberCheck">
            Keep me signed in
          </label>
        </div>

        <div>
          <button type="submit" className="btn btn-primary w-100 mb-0">
            Sign up
          </button>
        </div>

        <div className="position-relative my-4">
          <hr />
          <p className="small position-absolute top-50 start-50 translate-middle bg-mode px-1 px-sm-2">Or sign in with</p>
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
      </form>
    </>
  )
}

export default Form
