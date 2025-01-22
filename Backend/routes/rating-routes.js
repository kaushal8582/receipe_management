
const {Router} =  require("express");
const { authMiddleware } = require("../middleware/Auth-middleware");
const { addRating, getAllRatings } = require("../controllers/ratingController");

const router = Router()

router.post("/addRating",authMiddleware ,addRating)
router.post("/getAllRatings" ,getAllRatings)


module.exports = router;