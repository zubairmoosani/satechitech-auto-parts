'use client'
import avatar1 from '@/assets/images/avatar/01.jpg'
import avatar9 from '@/assets/images/avatar/09.jpg'
import TextFormInput from '@/components/form/TextFormInput'
import { useToggle } from '@/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Card, CardBody, CardHeader, Modal, ModalBody } from 'react-bootstrap'
import DatePicker from 'react-flatpickr'
import { useForm } from 'react-hook-form'
import { BsPlusLg } from 'react-icons/bs'

const TravelersForm = () => {
  const { isOpen, toggle } = useToggle()

  const { control } = useForm({
    defaultValues: {
      fName: 'Lori',
      lName: 'Stevens',
      fName2: 'Jacqueline',
      lName2: 'Miller',
    },
  })
  return (
    <>
      <Card className="border">
        <CardHeader className="border-bottom">
          <h4 className="card-header-title">Travelers Detail</h4>
        </CardHeader>
        <CardBody className="card-body vstack gap-4">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center p-0">
              <div className="d-flex align-items-center">
                <div className="avatar avatar-sm">
                  <Image className="avatar-img rounded-circle" src={avatar9} alt="avatar" />
                </div>
                <div className="ms-2">
                  <h6 className="mb-0">Lori Stevens</h6>
                </div>
              </div>
              <Link href="" className="btn btn-sm btn-link p-0 mb-0">
                Remove
              </Link>
            </CardHeader>
            <form className="card-body p-0 pt-3">
              <div className="mb-3">
                <label className="form-label">Full name</label>
                <div className="input-group">
                  <TextFormInput name="fName" placeholder="First name" control={control} combinedInput />
                  <TextFormInput name="lName" placeholder="Last name" control={control} combinedInput />
                </div>
              </div>
              <div>
                <label className="form-label">Date of Birth</label>
                <DatePicker
                  type="text"
                  className="form-control flatpickr"
                  defaultValue="29 Aug 1996"
                  placeholder="Enter date of birth"
                  options={{ dateFormat: 'd M Y' }}
                />
              </div>
            </form>
          </Card>
          <hr />
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center p-0">
              <div className="d-flex align-items-center">
                <div className="avatar avatar-sm">
                  <Image className="avatar-img rounded-circle" src={avatar1} alt="avatar" />
                </div>
                <div className="ms-2">
                  <h6 className="mb-0">Lori Stevens</h6>
                </div>
              </div>
              <Link href="" className="btn btn-sm btn-link p-0 mb-0">
                Remove
              </Link>
            </CardHeader>
            <form className="card-body p-0 pt-3">
              <div className="mb-3">
                <label className="form-label">Full name</label>
                <div className="input-group">
                  <TextFormInput name="fName2" placeholder="First name" control={control} combinedInput />
                  <TextFormInput name="lName2" placeholder="Last name" control={control} combinedInput />
                </div>
              </div>
              <div>
                <label className="form-label">Date of Birth</label>
                <DatePicker
                  type="text"
                  className="form-control flatpickr"
                  defaultValue="15 May 1994"
                  placeholder="Enter date of birth"
                  options={{ dateFormat: 'd M Y' }}
                />
              </div>
            </form>
          </Card>
          <div className="d-flex justify-content-end">
            <Button variant="primary" className="mb-0 items-center gap-1" type="button" onClick={toggle}>
              <BsPlusLg /> Add New Traveler
            </Button>
          </div>
        </CardBody>
      </Card>

      <Modal show={isOpen} onHide={toggle} className="fade">
        <div className="modal-header">
          <h5 className="modal-title" id="inquiryFormlabel">
            Add New Traveler
          </h5>
          <button type="button" className="btn-close" onClick={toggle} />
        </div>
        <ModalBody className="p-3">
          <form>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="First name" />
                <input type="text" className="form-control" placeholder="Last name" />
              </div>
              <small>Enter this person's name exactly as it's written on their official travel document</small>
            </div>
            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <DatePicker type="text" className="form-control flatpickr" options={{ dateFormat: 'd M y' }} />
              <small>It's important to enter a correct date of birth because these details can be used for booking or ticketing purposes</small>
            </div>
            <div className="text-end">
              <Button variant="dark" size="sm" className="mb-0" type="button">
                Add Traveler
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default TravelersForm
