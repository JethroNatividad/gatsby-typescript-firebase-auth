import React, { useEffect } from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Register from "../components/Register"
import Login from "../components/Login"
import Hello from "../components/Hello"
import { useAppDispatch, useAppSelector } from "../hooks"
import { currentAccount } from "../services/authService"
import { setCurrentUser, setLoading } from "../redux/user/slice"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core"
import PageNotFound from "../components/PageNotFound"
import Secret from "../components/secret"
import PrivateRoute from "../components/PrivateRoute"

const useStyles = makeStyles(() => ({
  loadingRoot: {
    display: "flex",
    height: "100vh",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}))

const App = () => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const { loadingRoot } = useStyles()
  useEffect(() => {
    const loadUser = async () => {
      dispatch(setLoading(true))
      const user = await currentAccount()
      dispatch(setCurrentUser(user))
      dispatch(setLoading(false))
    }
    loadUser()
  }, [])

  if (user.loading) {
    return (
      <div className={loadingRoot}>
        <CircularProgress />
      </div>
    )
  }
  return (
    <Layout>
      <Router>
        <Hello path="/app" />
        <Register path="/app/register" />
        <Login path="/app/login" />
        <PageNotFound default />

        <PrivateRoute as={Secret} path="/app/secret" />
      </Router>
    </Layout>
  )
}
export default App
