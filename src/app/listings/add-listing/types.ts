import Stepper from 'bs-stepper'
import { type Control } from 'react-hook-form'

export type StepProps = {
  stepperInstance?: Stepper
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
}
