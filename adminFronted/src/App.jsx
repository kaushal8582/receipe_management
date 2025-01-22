import AdminNav from "./component/AdminNav"
import UserList from "./pages/UserList"
import Login from "./pages/Login"

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
 

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
