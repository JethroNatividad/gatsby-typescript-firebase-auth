import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import firebase from "gatsby-plugin-firebase"

// Define a type for the slice state
export interface CurrentUser extends firebase.User {
  firstName: string
  lastName: string
  email: string | null
}
export interface DBUser {
  firstName: string
  lastName: string
  email: string
}
interface UserState {
  currentUser: CurrentUser | null
  loading: boolean
}

// Define the initial state using that type
const initialState: UserState = {
  currentUser: null,
  loading: true,
}

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    logoutUser: state => {
      state.currentUser = null
    },
    setCurrentUser: (state, action: PayloadAction<CurrentUser | null>) => {
      state.currentUser = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setCurrentUser, logoutUser, setLoading } = userSlice.actions

export default userSlice.reducer
