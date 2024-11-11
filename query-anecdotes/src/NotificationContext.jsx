import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "CLEAR":
      return ""
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = (timeout = 3000) => {
  const [, dispatch] = useContext(NotificationContext)

  const showNotificationWithTimeout = (message) => {
    dispatch({ type: "SET", payload: message })

    setTimeout(() => {
      dispatch({ type: "CLEAR" })
    }, timeout)
  }
  return showNotificationWithTimeout
}

export default NotificationContext
