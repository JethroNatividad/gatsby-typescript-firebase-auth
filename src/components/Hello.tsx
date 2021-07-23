import React from "react"
import { useAppSelector } from "../hooks"
import { RouteComponentProps } from "@reach/router"

const hello: React.FC<RouteComponentProps> = () => {
  const currentUser = useAppSelector(state => state.user.currentUser)
  return <div>Hello {currentUser?.firstName}</div>
}

export default hello
