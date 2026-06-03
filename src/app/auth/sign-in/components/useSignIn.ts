'use client'
import useQueryParams from '@/hooks/useQueryParams'
import { useNotificationContext } from '@/states/useNotificationContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const useSignIn = () => {
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()
  const { showNotification } = useNotificationContext()

  const queryParams = useQueryParams()

  const loginFormSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: 'admin@satechitech.com',
      password: 'Admin@123456',
    },
  })

  type LoginFormFields = yup.InferType<typeof loginFormSchema>

  const login = handleSubmit(async (values: LoginFormFields) => {
    setLoading(true)
    signIn('credentials', {
      redirect: false,
      email: values?.email,
      password: values?.password,
    }).then((res) => {
      if (res?.ok) {
        push(queryParams['redirectTo'] ?? '/admin/products/add')
        showNotification({
          message: 'Successfully logged in. Redirecting to add product...',
          type: 'success',
        })
      } else {
        showNotification({ message: res?.error ?? 'Invalid email or password.', type: 'error' })
      }
      setLoading(false)
    })
  })

  return { loading, login, control }
}

export default useSignIn
