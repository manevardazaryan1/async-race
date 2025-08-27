import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './Layout.css'

const Layout = () => {
  return (
    <>
      <Box className='layout'>
        <Navbar />
        <Outlet />
      </Box>
    </>
  )
}

export default Layout
