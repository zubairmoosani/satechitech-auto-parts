'use client'
import { Card, CardBody, CardHeader } from 'react-bootstrap'

import darkImg from '@/assets/images//element/d-dark.svg'
import defaultImg from '@/assets/images//element/d-default.svg'
import lightImg from '@/assets/images//element/d-light.svg'
import { useLayoutContext } from '@/states'
import Image from 'next/image'

const ModeSettings = () => {
  const { updateTheme } = useLayoutContext()
  return (
    <Card className="shadow mb-4">
      <CardHeader className="border-bottom p-3">
        <h5 className="card-header-title mb-0">Dark - Light Mode Settings</h5>
      </CardHeader>

      <CardBody>
        <div className="hstack gap-2 flex-wrap">
          <div onClick={() => updateTheme('light')} className="form-check form-check-inline align-items-center theme-icon-active">
            <input
              className="form-check-input mode-switch"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              defaultValue="option1"
              data-bs-theme-value="light"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              <Image alt='' src={lightImg} className="rounded shadow w-80px" />
            </label>
            <div className="text-center mt-1 small">Light</div>
          </div>

          <div onClick={() => updateTheme('dark')} className="form-check form-check-inline">
            <input
              className="form-check-input mode-switch"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              defaultValue="option2"
              data-bs-theme-value="dark"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              <Image alt='' src={darkImg} className="rounded shadow w-80px" />
            </label>
            <div className="text-center mt-1 small">Dark</div>
          </div>

          <div onClick={() => updateTheme('auto')} className="form-check form-check-inline">
            <input
              className="form-check-input mode-switch"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              defaultValue="option3"
              data-bs-theme-value="auto"
            />
            <label className="form-check-label" htmlFor="inlineRadio3">
              <Image alt='' src={defaultImg} className="rounded shadow w-80px" />
            </label>
            <div className="text-center mt-1 small">System Setting</div>
          </div>
        </div>

        <p className="mb-0 mt-3 small">
          <b>Note:</b> This is just UI of Theme mode setting. This is not working functionality.
        </p>
      </CardBody>
    </Card>
  )
}

export default ModeSettings
