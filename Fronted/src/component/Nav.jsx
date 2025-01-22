import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaUtensils, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ReceipeDataContext } from "../context/ReceipeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const { getAllReceipeParticularPerson,recipes } = useContext(ReceipeDataContext);

  async function getAllFollower() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    try {
      console.log("user id is : ", user.id);
      let id = user.id;
      const response = await axios.post(
        "http://localhost:3000/follow/follower",
        {
          followerId: id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response.data.data);
      setFollowers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllFollowing() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.post(
        "http://localhost:3000/follow/following",
        {
          followingId: user.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.data);
        setFollowing(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllFollower();
    getAllFollowing();
  }, []);

  function handleClickOnPerson(id) {
    console.log(id);
    getAllReceipeParticularPerson(id);
    setShowFollowers(false);
    setShowFollowing(false);
  }

  

  const PopupList = ({ items, title, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto max-h-[60vh]">
          {items.map((item) => (
            <div
              onClick={() =>
                handleClickOnPerson(
                  title == "Following" ? item.following.id : item.follower.id
                )
              }
              key={item.id}
              className="flex items-center cursor-pointer gap-3 p-4 hover:bg-gray-50"
            >
              <img
                src={item.avatar}
                alt={
                  title == "Following"
                    ? item.following.name
                    : item.follower.name
                }
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium cursor-pointer">
                {title == "Following"
                  ? item.following.name
                  : item.follower.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <FaUtensils className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                TastyBites
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/"
              className="px-3 py-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            >
              Home
            </a>

            <Link
              to={"/show-all-receipe"}
              className="px-3 py-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            >
              Recipes
            </Link>

            <div className="flex gap-4">
              <button
                onClick={() => setShowFollowers(true)}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                <span className="font-bold"></span> Followers
              </button>

              <button
                onClick={() => setShowFollowing(true)}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                <span className="font-bold"></span> Following
              </button>

              {showFollowers && (
                <PopupList
                  items={followers}
                  title="Followers"
                  onClose={() => setShowFollowers(false)}
                />
              )}

              {showFollowing && (
                <PopupList
                  items={following}
                  title="Following"
                  onClose={() => setShowFollowing(false)}
                />
              )}
            </div>

            <a
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors"
            >
              <FaUser className="h-4 w-4" />
              Profile
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            >
              Home
            </a>

            <Link
              to={"/show-all-receipe"}
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            >
              Recipes
            </Link>

            <a
              href="/profile"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            >
              <FaUser className="h-4 w-4" />
              Profile
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
