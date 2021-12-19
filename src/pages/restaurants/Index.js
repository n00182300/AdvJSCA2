import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


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

    if(!restaurants) return null

    const restaurantsList = restaurants.map((restaurant) => {
        return (
            <div key={restaurant._id}>
                
                <p><b>Name: </b> <Link to={`/restaurants/${restaurant._id}`} >{restaurant.name}</Link> </p>
                
                <p><b>Cruisine: </b> {restaurant.cuisine}</p>
                
                <hr />
            </div>
            
        )
    })
  
    return (
      <div>
        <h2>Restaurants</h2>
        <p>This is the Restaurants Index page</p>
        <Link to="create">Create</Link>
        { restaurantsList }
      </div>
    )
  }
  
  export default Index