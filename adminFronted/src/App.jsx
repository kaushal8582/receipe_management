import AdminNav from "./component/AdminNav"
import UserList from "./pages/UserList"

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
 

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <AdminNav/>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Dashboard</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          {/* <Route path="/nav" element={<AdminNav />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
