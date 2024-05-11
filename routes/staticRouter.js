const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async(req,res) => {
    if(!req.user) return res.redirect("/logIn");
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home",{
        urls: allUrls,
    });
});

router.get("/signup", (req,res) => {
    return res.render("signup");
});
router.get("/logIn", (req,res) => {
    return res.render("logIn");
});

module.exports = router;