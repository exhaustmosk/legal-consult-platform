import { Routes, Route, Link } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import AdminLogin from './pages/AdminLogin'

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Legal Consult Platform</h1>

      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/user-login" style={{ marginRight: '1rem' }}>User Login</Link>
        <Link to="/admin-login">Admin Login</Link>
      </nav>

      <Routes>
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </div>
  )
}

export default App
