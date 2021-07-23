import React from "react"
import { navigate, RouteComponentProps } from "@reach/router"
import { useAppSelector } from "../hooks"

interface PrivateRouteProps extends RouteComponentProps {
  as: any
}
const PrivateRoute: React.FC<PrivateRouteProps> = props => {
  const user = useAppSelector(state => state.user)

  const { as: Component } = props

  if (user.currentUser) {
    return <Component {...props} />
  }
  navigate("/app/register")
  return null
}
export default PrivateRoute
