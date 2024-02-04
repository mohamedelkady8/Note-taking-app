const express = require('express');
const router = express.Router();
const User = require("../controllers/user");

router.get("/:id", User.getUser);
router.post("/signup", User.signup);
router.post("/login", User.login);

router.post("/:id", User.updateUser);
router.delete("/:id", User.deleteUser);

module.exports = router;