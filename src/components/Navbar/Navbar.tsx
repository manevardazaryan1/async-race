import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'
import useRace from '../../hooks/garage/useRace'

const Navbar = () => {
  const { isRacing, isSingleRacing } = useRace()
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button disabled={isRacing || isSingleRacing} color='inherit' component={Link} to='/'>
          Garage
        </Button>
        <Button
          disabled={isRacing || isSingleRacing}
          color='inherit'
          component={Link}
          to='/winners'
        >
          Winners
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
