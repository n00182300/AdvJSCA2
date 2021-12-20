import { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, MenuItem, FormControl, Select, InputLabel, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'

// import moment from 'moment'

// import { LocalizationProvider, DateTimePicker } from '@mui/lab'

// import AdapterMoment from '@mui/lab/AdapterMoment'


const Edit = () => {

  let navigate = useNavigate()
  let { id } = useParams()

  const [form, setForm] = useState({})
  const [restaurant, setRestaurant] = useState({})

  let token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`http://localhost:8000/restaurants/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        setRestaurant(response.data)
        setForm(response.data)
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }, [id, token])

  //tells this use effect to run when [restaurant] has been modified. very powerful. "watcher" or restaurant variable
  useEffect(() => {
    setForm({
      //handling the logic
      name: restaurant.restaurant.name,
      cuisine: restaurant.restaurant.cuisine,
      borough: restaurant.restaurant.borough

    })
  }, [restaurant]) //this takes care of the form(setting intital value)

  if (!restaurant) return null


  const handleForm = e => {

    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))

  }

  const submitForm = () => {
    console.log(form)

    let token = localStorage.getItem('token')

    axios.put(`http://localhost:8000/restaurants/${id}`, form, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        navigate(`/restaurants/${response.data._id}`)
      })
      .catch(err => console.log(err))
  }

  //tiny component for loading
  const Loading = () => {
    return <div className="form-group">Loading . . .</div>
  }

  return (
    <div>
      <h2>Edit</h2>

      {/* conditionally loading he text field. js -> jsx */}
      {
        form.name ? (<div className="form-group">
          <TextField variant="filled" label="Name" name="name" onChange={handleForm} value={form.name} InputLabelProps={{
            shrink: true,
          }} />
        </div>
        ) : (<Loading />)
      }



      {/* <div className="form-group">
          <TextField multiline rows="4" variant="filled" label="Description" name="description" value={form.description} onChange={handleForm} InputLabelProps={{
          shrink: true,
        }} /> 
        </div> */}

      {
        form.borough ? (
          <div className="form-group">
            <FormControl variant="filled" fullWidth >
              <InputLabel id="borough-select-label">City</InputLabel>
              <Select labelId="borough-select-label" onChange={handleForm} label="Borough" name="borough" value={form.borough} >
                <MenuItem value="dublin">Dublin</MenuItem>
                <MenuItem value="cork">Cork</MenuItem>
                <MenuItem value="galway">Galway</MenuItem>
                <MenuItem value="mayo">Mayo</MenuItem>
                <MenuItem value="wexford">Wexford</MenuItem>
              </Select>
            </FormControl>
          </div>) : (<Loading />)
      }


      {/* <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start Date"
            name="start_date"
            onChange={handleForm}
          />
        </LocalizationProvider> */}


      {/* {
          form.start_date ? (
            <div className="form-group">


            <TextField
              id="datetime-local"
              label="Start Date"
              type="datetime-local"
              variant="filled"
              name="start_date"
              onChange={handleForm}
              defaultValue={form.start_date}
              // defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />
              </div>
          ) : (<Loading/>)
        }
        

        {
          form.end_date ? (
            <div className="form-group">

            <TextField
              id="datetime-local"
              label="End Date"
              type="datetime-local"
              variant="filled"
              name="end_date"
              onChange={handleForm}
              defaultValue={form.end_date}
              // defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />
              </div>
          ) : (<Loading />)
        } */}



      <Button onClick={submitForm} variant="contained">Submit</Button>

    </div>
  )
}

export default Edit