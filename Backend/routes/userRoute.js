const { Router } = require("express");
const { register, login, logOut } = require("../controllers/user-controller");
const { authMiddleware } = require("../middleware/Auth-middleware");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logOut);

module.exports = router;
