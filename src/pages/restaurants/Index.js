import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, FormGroup, Button, CardHeader, CardContent, CardActionArea } from '@mui/material';
import { Grid, Container } from "@mui/material"


const Index = () => {
    const [restaurants, setRestaurants] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8000/restaurants')
            .then(response => {
                console.log(response.data)
                setRestaurants(response.data.restaurants)
            })
            .catch(err => {
                console.log(`Error: ${err}`)
            })
    }, [])

    if (!restaurants) return null

    const restaurantsList = restaurants.map((restaurant) => {
        return (
            <div key={restaurant._id}>
                <Card>
                    <CardActionArea component={Link} to={`/restaurants/${restaurant._id}`} >
                        <CardHeader title={restaurant.name} />
                        

                        <CardContent>
                            <p><b>Cruisine: </b> {restaurant.cuisine}</p>
                            <p><b>Building: </b> {restaurant.address.building}</p>
                            <p><b>Street: </b> {restaurant.address.street}</p>
                            <p><b>Borough: </b> {restaurant.borough}</p>
                            <p><b>Zipcode: </b> {restaurant.address.zipcode}</p>
                            <p><b>Grades: </b> {restaurant.grades[0].grade} , ({restaurant.grades[0].date}) , ({restaurant.grades[0].score})</p>
                            
                        </CardContent>
                    </CardActionArea>
                </Card>

            </div>

        )
    })

    return (

        <Container style={{ marginTop: '64px' }}>
            <Grid container>
                <Grid item lg={8}>
                    <h2>Restaurants</h2>
                    <p>This is the Restaurants Index page</p>


                    {restaurantsList}
                </Grid>
            </Grid>
        </Container>

    )
}

export default Index