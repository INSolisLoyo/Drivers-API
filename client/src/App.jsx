import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './Views/Landing/Landing'
import Home from './Views/Home/Home'
import Form from './Views/Form/Form'
import Detail from './Views/Detail/Detail'
import Navbar from './components/Navbar/Navbar'

function App() {
 
  const location = useLocation();
  const noNavRoutes = ['/'];
  const hideNav = noNavRoutes.includes(location.pathname);

  return (
    <>
      { !hideNav && <Navbar/>}
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/create' element={<Form/>}/>
      </Routes>
    </>
  )
}

export default App
