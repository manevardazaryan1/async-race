import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Box } from '@mui/material'
import useRace from '../../hooks/garage/useRace'
import './Navbar.css'

const Navbar = () => {
  const { isRacing, isSingleRacing } = useRace()
  return (
    <AppBar position='static' className='navbar'>
      <Toolbar className='toolbar'>
        <Box className='logo-box'>
          <Link to='/' className='logo'>
            ASYNC RACE
          </Link>
        </Box>
        <Box className='menu'>
          <Button
            className='menu-item'
            disabled={isRacing || isSingleRacing}
            style={{ color: `${isRacing || isSingleRacing ? '#555' : '#fff'}` }}
            color='inherit'
            component={Link}
            to='/'
          >
            Garage
          </Button>
          <Button
            className='menu-item'
            disabled={isRacing || isSingleRacing}
            style={{ color: `${isRacing || isSingleRacing ? '#555' : '#fff'}` }}
            color='inherit'
            component={Link}
            to='/winners'
          >
            Winners
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
