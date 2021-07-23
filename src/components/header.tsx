import * as React from "react"
import { Link as GatsbyLink, navigate } from "gatsby"
import { useAppDispatch, useAppSelector } from "../hooks"
import { firebaseAuth } from "../services/authService"
import { setLoading, setCurrentUser } from "../redux/user/slice"

const Header: React.FC<{ siteTitle: string }> = ({ siteTitle }) => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  const handleSignOut = async () => {
    dispatch(setLoading(true))
    await firebaseAuth.signOut()
    dispatch(setCurrentUser(null))
    dispatch(setLoading(false))

    navigate("/app/register")
  }

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ margin: 0 }}>
          <GatsbyLink
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </GatsbyLink>
        </h1>
        {user.currentUser && (
          <h5>
            <GatsbyLink
              style={{
                color: `white`,
              }}
              to="#"
              onClick={handleSignOut}
            >
              LOGOUT
            </GatsbyLink>
          </h5>
        )}
      </div>
    </header>
  )
}

export default Header
