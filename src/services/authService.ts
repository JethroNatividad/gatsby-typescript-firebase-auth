import firebase from "gatsby-plugin-firebase"
import { CurrentUser, DBUser } from "../redux/user/slice"

export const db = firebase.firestore()
export const firebaseAuth = firebase.auth()
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
interface UserLogin {
  email: string
  password: string
}

export const userSignUp: UserSignUp = async params => {
  const { firstName, lastName, email, password } = params
  try {
    const response = await firebaseAuth.createUserWithEmailAndPassword(
      email,
      password
    )
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

// export const userLogin: UserLogin = async params => {
//   const { email, password } = params
//   try {
//     const response = await firebaseAuth.signInWithEmailAndPassword(
//       email,
//       password
//     )
//     const { user } = response

//     if (user) {
//       const userFields = await db
//         .collection("users")
//         .doc(user.uid)
//         .get()
//         .then(doc => {
//           const data = doc.data() as DBUser
//           return data
//         })
//       if (userFields && user.email) {
//         const mergedUser: CurrentUser = Object.assign(user, {
//           id: user.uid,
//           firstName: userFields.firstName,
//           lastName: userFields.lastName,
//         })
//         return mergedUser
//       }
//     }
//   } catch (error) {
//     if (error.code === "auth/email-already-in-use") {
//       return { error: error.message, field: "email" }
//     } else {
//       alert(error)
//     }
//     // return { success: false, message: error.message }
//   }
// }

export const userLogin = ({ email, password }: UserLogin) => {
  console.log(email, password)
  return new Promise<CurrentUser | null>((resolve, reject) => {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const getCurrentUser = async () => {
          if (user) {
            const userFields = await db
              .collection("users")
              .doc(user.uid)
              .get()
              .then(doc => {
                const data = doc.data() as DBUser
                return data
              })

            if (userFields && user.email) {
              const mergedUser: CurrentUser = Object.assign(user, {
                id: user.uid,
                firstName: userFields.firstName,
                lastName: userFields.lastName,
              })
              return mergedUser
            }
          }
          return null
        }
        resolve(getCurrentUser())
      })
      .catch(e => {
        reject(e)
      })
  })
}

export const currentAccount = async () => {
  // let userLoaded = false
  const getCurrentUser = (auth: firebase.auth.Auth) => {
    return new Promise<CurrentUser | null>((resolve, reject) => {
      // if (userLoaded) {
      //   resolve(firebaseAuth.currentUser)
      // }

      const unsubscribe = auth.onAuthStateChanged(user => {
        console.log("Load user", user)
        // userLoaded = true
        unsubscribe()

        const getUserData = async () => {
          if (user) {
            const userFields = await db
              .collection("users")
              .doc(user.uid)
              .get()
              .then(doc => {
                const data = doc.data() as DBUser
                return data
              })

            if (userFields && user.email) {
              const mergedUser: CurrentUser = Object.assign(user, {
                id: user.uid,
                firstName: userFields.firstName,
                lastName: userFields.lastName,
              })
              return mergedUser
            }
          }
          return null
        }
        resolve(getUserData())
      }, reject)
    })
  }
  return getCurrentUser(firebaseAuth)
}
