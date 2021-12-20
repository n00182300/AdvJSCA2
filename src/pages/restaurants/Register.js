// import { useState } from 'react'
// import axios from 'axios'
// import TextField from '@mui/material/TextField';
// import { Card, FormGroup, Button, CardHeader, CardContent } from '@mui/material';
// import { useNavigate,Link } from 'react-router-dom'
import RegisterForm from '../../components/RegisterForm';
import { Grid, Container } from "@mui/material"

const Register = (props) => {
    return(
    <>
    
    <Grid container justifyContent="center" marginTop={14}>
    
    <RegisterForm onAuthenticated={props.onAuthenticated}/>
    </Grid>
    </>
    )
}


export default Register