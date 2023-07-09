const express = require("express");
const {
  handleHostelInfo,
  handleLibraryInfo,
  handleNccInfo,
  handlCccInfo,
  handleSportInfo,
  handleGuestHouseInfo,
} = require("../controller/facility");

const router = express.Router();

router.route("/hostel/:hostel_no").get(handleHostelInfo);
router.route("/library").get(handleLibraryInfo);
router.route("/ncc").get(handleNccInfo);
router.route("/central-computer-centre").get(handlCccInfo);
router.route("/sport-cultural").get(handleSportInfo);
router.route("/guest-house").get(handleGuestHouseInfo)

module.exports = router;


//no use
