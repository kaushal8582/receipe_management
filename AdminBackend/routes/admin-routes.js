
const {Router} = require("express");
const { loginAdmin, getAllUserInfo, banUser, unBanUser, deleteUser } = require("../controllers/admin-controllers");

const router = Router();

router.post("/login",loginAdmin);
router.get("/get-all-user",getAllUserInfo);
router.get("/ban-user/:id",banUser);
router.get("/unban-user/:id",unBanUser);
router.delete("/delete-user/:id",deleteUser);

module.exports = router;