const express = require("express");
const router = express.Router();
const messages = require("../db");

router.get("/", (req, res) => res.render("index", { title: "Mini Messageboard", messages: messages }));

router.get("/new", (req, res) => res.render("form"));

router.post("/new", (req, res) => {
  messages.push({ id: messages.length, text: req.body.message , user: req.body.user, added: new Date() });
  res.redirect("/");
});

router.get("/messages/:messageid", (req, res) => {
  const id = parseInt(req.params.messageid);
  if (id < messages.length)
    res.render("message", {message: messages[id]});
  else 
    res.send("No message found");
});

module.exports = router;