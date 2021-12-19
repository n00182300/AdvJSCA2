import { useState } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';

const LoginForm = props => {

  const [form, setForm] = useState({email: "cg@example.net", password: "secret123"})

  const handleForm = e => {

    setForm(prevState => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))

  }

  const submitForm = () => {
    console.log(form)

    axios.post('http://localhost:8000/users/login', {
      email: form.email,
      password: form.password
    })
        .then(response => {
          console.log(response.data.token)
          props.onAuthenticated(true, response.data.auth_token)
        })
        .catch(err => console.log(err))
  }

  let btnStyles = {
    backgroundColor: "yellow",
    fontWeight: "bold"
  }

  return (
    <>
      <TextField label="Email" variant="outlined" name="email" onChange={handleForm} /> <br/>
      Password: <input type="password" name="password" onChange={handleForm} />

      <button style={btnStyles} onClick={submitForm}>Submit</button>
    </>
  )
}

export default LoginForm