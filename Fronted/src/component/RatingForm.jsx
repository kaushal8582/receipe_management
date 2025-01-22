import axios from "axios";
import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { ReceipeDataContext } from "../context/ReceipeContext";

const RatingForm = ({ receipeid }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { getAllRatingInfo, allRatingInfo } = useContext(ReceipeDataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating && description) {
      console.log("Review submitted!", rating, description);
      addRating(rating, description);
      setRating(0);
      setDescription("");
      setShowForm(false);
    }
  };

  async function addRating(ratingvalue, msg) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to rate the receipe");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/rating/addRating`,
        {
            ratingValue: ratingvalue,
          desc: msg,
          receipeid: receipeid,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        alert("Rating added successfully!");
        getAllRatingInfo(receipeid);
      }
    } catch (error) {
      if(error.response.data.message=="unauthorized user"){
        alert("unauthorize user plz login")
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Rating & Reviews</h2>
      <div className="flex justify-center mb-4">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <FaStar
              key={index}
              className="cursor-pointer mx-1 text-3xl"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              onClick={() => {
                setRating(ratingValue);
                setShowForm(true);
              }}
            />
          );
        })}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Write your review..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit Review
          </button>
        </form>
      )}

      {allRatingInfo.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Reviews</h2>
          <div className="space-y-4">
            {allRatingInfo.map((review) => (
              <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className="text-xl"
                      color={index + 1 <= review.rating ? "#ffc107" : "#e4e5e9"}
                    />
                  ))}
                </div>
                 <p className="text-gray-700">{review.description}</p>
                 <h2 className=" flex " >By : <p className="text-gray-700 ">{review.User.name} </p></h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingForm;
