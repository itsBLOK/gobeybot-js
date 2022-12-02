const express = require("express"),
  CheckAuth = require("../auth/CheckAuth"),
  router = express.Router();

router.get("/", CheckAuth, async (req, res) => {
  res.redirect("/dashboard");
});

router.get("/dashboard", CheckAuth, async (req, res) => {
  res.render("dashboard", {
    user: req.userInfos,
    currentURL: `${req.client.config.DASHBOARD.baseURL}/${req.originalUrl}`,
  });
});

module.exports = router;
