import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import Garage from '../pages/Garage/Garage'
import Winners from '../pages/Winners/Winners'
import NotFound from '../pages/NotFound/NotFound'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Garage />} />
        <Route path='/winners' element={<Winners />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
