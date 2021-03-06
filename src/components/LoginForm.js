import { useState } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import { Card, FormGroup, Button, CardHeader, CardContent } from '@mui/material';
import { useNavigate,Link } from 'react-router-dom'

const LoginForm = props => {

  const [form, setForm] = useState({ email: "cg@example.net", password: "secret123" })

  let navigate = useNavigate()

  const handleForm = e => {

    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))

  }

  const submitForm = () => {
    console.log(form)

    axios.post('http://localhost:8000/users/login', {
      email: form.email,
      password: form.password
    })
      .then(response => {

        console.log(response.data.auth_token)
        props.onAuthenticated(true, response.data.auth_token)
        navigate('/restaurants', { replace: true })
      })
      .catch(err => console.log(err))
  }
  

  let btnStyles = {
    backgroundColor: "yellow",
    fontWeight: "bold"
  }

  return (
    <>
      <Card>
        <CardHeader title="Login" />
        <CardContent>
          <FormGroup>

            <TextField label="Email" variant="outlined" name="email" onChange={handleForm} />
            <br />
            <TextField label="Password" variant="outlined" type="password" name="password" onChange={handleForm} />
            <br />
            <Button onClick={submitForm} variant="contained">Submit</Button>
            <Button ><Link to="/register">Register</Link></Button>
            

          </FormGroup>
        </CardContent>
      </Card>



    </>
  )
}

export default LoginForm