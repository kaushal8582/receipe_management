const { Router } = require("express");
const {
  followUser,
  unfollowUser,
  getMyAllFollower,
  getAllFollowing,
  checkFollow,
} = require("../controllers/Follow-controller");
const { authMiddleware } = require("../middleware/Auth-middleware");

const router = Router();

router.post("/follow", authMiddleware, followUser);
router.post("/unfollow", authMiddleware, unfollowUser);
router.post("/follower", getMyAllFollower);
router.post("/following", authMiddleware, getAllFollowing);
router.post("/check-follow", authMiddleware, checkFollow);

module.exports = router;
