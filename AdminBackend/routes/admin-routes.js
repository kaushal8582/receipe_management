
const {Router} = require("express");
const { loginAdmin, getAllUserInfo, banUser, unBanUser, deleteUser } = require("../controllers/admin-controllers");
const { authMiddleware } = require("../middleware/Auth-middleware");

const router = Router();

router.post("/login",loginAdmin);
router.get("/get-all-user",authMiddleware,getAllUserInfo);
router.get("/ban-user/:id",authMiddleware,banUser);
router.get("/unban-user/:id",authMiddleware,unBanUser);
router.delete("/delete-user/:id",authMiddleware,deleteUser);

module.exports = router;