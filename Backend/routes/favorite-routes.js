const { createCollection, saveFavoriteReceipe, getFavoriteReceipe, getFavoriteReceipeCollectionName } = require("../controllers/favoriteReceipe-controller");
const {authMiddleware} = require("../middleware/Auth-middleware")

const {Router} = require("express");
const router = Router();


router.post("/addcollection",authMiddleware,createCollection)
router.post("/savereceipe",authMiddleware,saveFavoriteReceipe)
router.post("/getreceipe",authMiddleware,getFavoriteReceipe)
router.get("/getallfavoritecollection",authMiddleware,getFavoriteReceipeCollectionName)



module.exports = router