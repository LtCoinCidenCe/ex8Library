import { useMutation } from "@apollo/client"
import React, { useEffect } from "react"
import { LOGIN } from "../queries"

const Login = (props) => {
  const [loginAct, result] = useMutation(LOGIN, {
    onError: (error) => alert(error.graphQLErrors[0].message)
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      console.log(token)
      localStorage.setItem('kirjastoKirjoittajat', token)
      props.setToken(token)
      props.setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  if (!props.show)
    return null

  const submitLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    loginAct({ variables: { username, password } })
  } // uncontrolled login form data handler

  return <div>
    <form onSubmit={submitLogin}>
      <div>name<input name="username" /></div>
      <div>password<input name="password" /></div>
      <button type="submit">login</button>
    </form>
  </div>
}

export default Login
