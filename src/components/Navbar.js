import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Box, Toolbar, MenuItem } from '@mui/material'


const Navbar = props => {

  let logoutButton
  let navigate = useNavigate()

  const logout = () => {
    props.onAuthenticated(false)
    navigate('/', { replace: true })
  }

  if (props.authenticated) {
    logoutButton = (
      <MenuItem align="right" onClick={logout}>Logout</MenuItem>
    )
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <MenuItem>
            <Link to="/">Home</Link>
          </MenuItem>
          <MenuItem>
            <Link to="restaurants"> Restaurants</Link>
          </MenuItem>
          {logoutButton}

        </Toolbar>

      </AppBar>

    </>
  )
}

export default Navbar