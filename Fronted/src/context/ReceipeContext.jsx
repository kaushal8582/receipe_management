import axios from "axios";
import { createContext, useState } from "react";

export const ReceipeDataContext = createContext();

const ReceipeContext = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [favoriteCollection, setFavoriteCollection] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [allRatingInfo, setAllRatingInfo] = useState([]);

  async function getAllReceipe() {
    try {
      const response = await axios.get("http://localhost:3000/receipe/getall");

      if (response.status === 200) {
        console.log(response.data.data);
        setRecipes(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllFavoriteCollection() {
    try {
      let token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/favorite/getallfavoritecollection",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.data);
        setFavoriteCollection(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllRatingInfo(receipeid) {
    try {
      const response = await axios.post(
        "http://localhost:3000/rating/getAllRatings",
        {
          receipeid: receipeid,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.data);
        setAllRatingInfo(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllFavoriteItems(name) {
    try {
      const response = await axios.post(
        "http://localhost:3000/favorite/getreceipe",
        {
          name: name,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.data);
        setFavoriteItems(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }


  async function getAllReceipeParticularPerson(id) {

    let userId=null
    if(id){
      userId=id
    }else{
      userId=JSON.parse(localStorage.getItem("user")).id
    }


    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/receipe/getall/recipes",
        {
          id: userId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.data);
        setRecipes(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ReceipeDataContext.Provider
        value={{
          recipes,
          getAllReceipe,
          getAllFavoriteCollection,
          favoriteCollection,
          setFavoriteCollection,
          getAllFavoriteItems,
          favoriteItems,
          getAllRatingInfo,
          allRatingInfo,
          getAllReceipeParticularPerson
        }}
      >
        {children}
      </ReceipeDataContext.Provider>
    </div>
  );
};

export default ReceipeContext;
