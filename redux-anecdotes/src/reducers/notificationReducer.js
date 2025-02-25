import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearMessage() {
      return ""
    },
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (message, sec=5) => {
  return (dispatch) => {
    dispatch(setMessage(message))

    setTimeout(() => {
      dispatch(clearMessage())
    }, (sec * 1000))
  }
}
export default notificationSlice.reducer
