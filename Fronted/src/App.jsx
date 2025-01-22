import CreateEditRecipe from "./component/ReceipeForm"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import RecipeDetails from "./pages/RecipeDetails"
import Register from "./pages/Register"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ShowAllReceipe from "./pages/ShowAllReceipe"

function App() {
  

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/receipe-details/:id" element={<RecipeDetails/>}/>
      <Route path="/create-recipe" element={<CreateEditRecipe/>}/>
      <Route path="/edit-recipe/:id" element={<CreateEditRecipe/>}/>
      <Route path="/show-all-receipe" element={<ShowAllReceipe/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
