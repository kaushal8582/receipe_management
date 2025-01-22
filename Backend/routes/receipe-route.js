const { Router } = require("express");
const upload = require("../middleware/multer.middleware");
const { createReceipe,editReceipe, deleteReceipe, getAllReceipe, getParticularUserAllReceipe, getReceipeById, searchReceipe, filterReceipe } = require("../controllers/receipe-controller");
const { authMiddleware } = require("../middleware/Auth-middleware");

const routes = Router();

routes.post(
  "/create",
  authMiddleware,
  upload.fields(
    [
      {
        name: "img",
        maxCount: 1,
      },
    ],
),
createReceipe
);

routes.post("/update", authMiddleware,editReceipe);
routes.post("/delete/:id", authMiddleware,deleteReceipe);
routes.get("/getall",getAllReceipe);
routes.post("/getall/recipes",authMiddleware ,getParticularUserAllReceipe);
routes.get("/get/:id", getReceipeById);
routes.post("/search", searchReceipe);
routes.post("/filter", filterReceipe);

module.exports = routes;
