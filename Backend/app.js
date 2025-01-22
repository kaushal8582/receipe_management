const express = require("express");
const dotenv = require("dotenv");
const database = require("./utils/database");
const bodyParser = require("body-parser");
const cors = require("cors");

// Load environment variables
dotenv.config();
if (!process.env.PORT) {
  console.error("PORT is not defined in the .env file.");
  process.exit(1);
}

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Import models
const User = require("./models/user-model");
const Receipe = require("./models/receipe-model");
const FavoriteReceipe = require("./models/FavoriteReceipe");
const Collection = require("./models/Collection");
const Rating = require("./models/rating-model");

// Import routes
const userRoute = require("./routes/userRoute");
const receipeRoute = require("./routes/receipe-route");
const favoriteReceipeRoute = require("./routes/favorite-routes");
const ratingRoute = require("./routes/rating-routes");
const FollowrRoute = require("./routes/Follow-routes");
const Follow = require("./models/Follow");

// Register routes
app.use("/user", userRoute);
app.use("/receipe", receipeRoute);
app.use("/favorite", favoriteReceipeRoute);
app.use("/rating", ratingRoute);
app.use("/follow", FollowrRoute);

// Sequelize Associations

// 1. User and Receipe relationship
User.hasMany(Receipe, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Receipe.belongsTo(User, { foreignKey: "userId" });

// 2. User and Collection relationship
User.hasMany(Collection, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Collection.belongsTo(User, { foreignKey: "userId" });

// 3. Collection and Receipe many-to-many relationship
Collection.belongsToMany(Receipe, {
  through: FavoriteReceipe,
  foreignKey: "collectionId", // Collection ID in FavoriteReceipe
  otherKey: "receipeId", // Receipe ID in FavoriteReceipe
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Receipe.belongsToMany(Collection, {
  through: FavoriteReceipe,
  foreignKey: "receipeId", // Receipe ID in FavoriteReceipe
  otherKey: "collectionId", // Collection ID in FavoriteReceipe
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// 4. Receipe and Rating relationship
Receipe.hasMany(Rating, {
  foreignKey: "receipeId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Rating.belongsTo(Receipe, { foreignKey: "receipeId" });

// 5. User and Rating relationship
User.hasMany(Rating, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Rating.belongsTo(User, { foreignKey: "userId" });

// 6. User and Follow relationship
User.hasMany(Follow, {
  foreignKey: "followerId", // The user who is following
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Define the 'belongsTo' association from Follow to User (follower)
Follow.belongsTo(User, {
  foreignKey: "followerId", // The user who is following
  as: "follower", // Alias for the follower user
});

// Define the 'belongsTo' association from Follow to User (following)
Follow.belongsTo(User, {
  foreignKey: "followingId", // The user who is being followed
  as: "following", // Alias for the followed user
});

// Sync database and start server
database
  .sync() // Use { alter: true } to modify tables without dropping data # {force:true}
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on port:", process.env.PORT || 3000);
    });
  })
  .catch((error) => {
    console.error("Database sync failed:", error);
  });

// Graceful error handling
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});
