import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define a type for the slice state
interface CurrentUser {
  firstName: string
  lastName: string
  email: string
}
interface UserState {
  currentUser: CurrentUser | null
}

// Define the initial state using that type
const initialState: UserState = {
  currentUser: null,
}

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    loginUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload
    },
    logoutUser: state => {
      state.currentUser = null
    },
  },
})

export const { loginUser, logoutUser } = userSlice.actions

export default userSlice.reducer
