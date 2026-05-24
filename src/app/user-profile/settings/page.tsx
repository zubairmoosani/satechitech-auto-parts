import NotificationSettings from './components/NotificationSettings'
import SecuritySettings from './components/SecuritySettings'

const Settings = () => {
  return (
    <>
      <div className="vstack gap-4">
        <NotificationSettings />

        <SecuritySettings />
      </div>
    </>
  )
}

export default Settings
