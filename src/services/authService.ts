import firebase from "gatsby-plugin-firebase"

export const db = firebase.firestore()
export const auth = firebase.auth()
export interface Res {
  success: boolean
  message: string
}

interface UserSignUp {
  (params: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<{ error: string; field: string } | undefined>
}

export const userSignUp: UserSignUp = async params => {
  const { firstName, lastName, email, password } = params
  try {
    const response = await auth.createUserWithEmailAndPassword(email, password)
    const { user } = response
    db.collection("users").doc(user?.uid).set({
      firstName,
      lastName,
      email,
    })
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return { error: error.message, field: "email" }
    } else {
      alert(error)
    }
    // return { success: false, message: error.message }
  }
}
