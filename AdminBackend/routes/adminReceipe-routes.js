
const {Router} = require("express");
const { removeReceipe } = require("../controllers/adminReceipe-controller");
const router = Router();

router.post("/remove-receipe/:id",removeReceipe);


module.exports = router;