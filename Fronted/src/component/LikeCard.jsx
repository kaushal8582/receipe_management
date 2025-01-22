import axios from "axios";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ReceipeDataContext } from "../context/ReceipeContext";

const LikeCard = ({ name, id ,setIsCardOpen }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItemText, setNewItemText] = useState("");

  const { setFavoriteCollection, favoriteCollection } =
    useContext(ReceipeDataContext);

  const handleAddItem = async () => {
    if (newItemText.trim() !== "") {
      try {
        const response = await axios.post(
          "http://localhost:3000/favorite/addcollection",
          {
            name: newItemText,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          console.log("Item added successfully:", response.data);
          // You can update your UI or state here to reflect the added item.
          // setSelectedItem(response.data.data.id);
          setFavoriteCollection([...favoriteCollection, response.data.data]);
        }
      } catch (error) {
        console.error("Error adding item:", error);
      }

      setNewItemText("");
    }
  };

  const handleCheckboxChange = async (itemId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/favorite/savereceipe",
        {
          receipeid: id,
          collectionid: itemId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        console.log("Item updated successfully:", response.data);
        setIsCardOpen(false)
      }

    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="max-w-md absolute top-0 left-[50%] translate-x-[-50%] translate-y-0 z-20 mx-auto p-4">
      {
        <div className="mt-4 p-6 bg-white rounded-lg shadow-lg border">
          {/* Create New Item Section */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="Enter text"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddItem}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaPlus /> Create
            </button>
          </div>

          {/* List of Items */}
          <div className="space-y-3">
            {name.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedItem === item.id}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default LikeCard;
