import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import AdminDashboard from './pages/AdminPage/AdminDashboard';

function App() {

  return (
    
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/admin" element={ <AdminDashboard/> }/>
      </Routes>
  )
}

export default App;
