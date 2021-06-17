import React, { useEffect, useState } from "react"

import Layout from "../components/layout"
import { auth } from "../services/authService"

const IndexPage = () => {
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user && user.email) {
        setUserEmail(user.email)
      } else {
        setUserEmail("")
      }
    })
  }, [])

  return (
    <Layout>
      <p>YO {userEmail}</p>
    </Layout>
  )
}

export default IndexPage
