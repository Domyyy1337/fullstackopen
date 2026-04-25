import { useNotification } from '../store/notificationStore'

const Notification = () => {
  const notification = useNotification()

  /**
   * @type {import("react").CSSProperties}
   */
  const style = {
    border: 'solid',
    borderColor: notification ? '' : 'transparent',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    minHeight: 20,
  }

  return <div style={style}>{notification}</div>
}

export default Notification
