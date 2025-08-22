import { AppBar, Toolbar, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          Garage
        </Button>
        <Button color='inherit' component={Link} to='/winners'>
          Winners
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
