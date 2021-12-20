import LoginForm from "../components/LoginForm"
import { Grid, Container } from "@mui/material"


const Home = props => {

  return (
    <div>
      <Container stytle={{ marginTop: '64' }}>

        <Grid container style={{ minHeight: '100vh', marginTop: '100', objectFit: 'cover' }}>

          <Grid item xs={12} sm={6}>

            <img
              src="https://www.eatwell101.com/wp-content/uploads/2019/05/chicken-bites-and-asparagus-recipe.jpg"
              style={{ width: '100%', height: '100%', objectFit: "cover" }}>

            </img>

          </Grid>


          <Grid container item xs={12} sm={6}
            alignItems="center"
            direction="column"
            justify="space-between"
            style={{ padding: 10 }}>

            <div style={{ display: "flex", flexDirection: "column", maxWidth: 500 }}>
              <Grid container justify="center" margin="normal">
                {!props.authenticated ? <LoginForm onAuthenticated={props.onAuthenticated} /> : ""}
              </Grid>
            </div>
          </Grid>



        </Grid>
      </Container>
    </div>
  )
}

export default Home