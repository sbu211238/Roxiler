import './App.css'
import { Form } from './components/Form'
import { LoginPage } from './pages/LoginPage'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import { Home } from './pages/Home'

function App() {

  return (
    <>

    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<Form/>}/>
        </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
