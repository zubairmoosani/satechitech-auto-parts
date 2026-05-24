'use client'
import PasswordFormInput from '@/components/form/PasswordFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardHeader } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type UpdatePasswordFormData = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const UpdatePassword = () => {
  const updatePasswordSchema = yup.object({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup
      .string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters')
      .notOneOf([yup.ref('currentPassword')], 'New password must be different from current password'),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('newPassword')], 'Passwords must match'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: yupResolver(updatePasswordSchema) as any,
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })
  return (
    <Card className="border">
      <CardHeader className="border-bottom">
        <h4 className="card-header-title">Update Password</h4>
        <p className="mb-0">
          Your current email address is
          <span className="text-primary">example@gmail.com</span>
        </p>
      </CardHeader>

      <form onSubmit={handleSubmit(() => {})} className="card-body">
        <PasswordFormInput
          name="currentPassword"
          label="Current password"
          placeholder="Enter current password"
          containerClass="mb-3"
          control={control}
        />

        <PasswordFormInput name="newPassword" label="Enter new password" placeholder="Enter new password" containerClass="mb-3" control={control} />

        <PasswordFormInput
          name="confirmPassword"
          label="Confirm new password"
          placeholder="Confirm new password"
          containerClass="mb-3"
          control={control}
        />

        <div className="text-end">
          <Button type="submit" variant="primary" className="mb-0">
            Change Password
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default UpdatePassword
