const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => res.render("index", { title: "Mini Messageboard", messages: await db.getAllMessages() }));

router.get("/new", (req, res) => res.render("form"));

router.post("/new", async(req, res) => {
  await db.addMessage(req.body.message ,req.body.user);
  res.redirect("/");
});

router.get("/messages/:messageid", async (req, res) => {
  const id = parseInt(req.params.messageid);
  let messages = await db.getMessage(id);
  if (messages.length === 0) {
    // res.send("<div>No message found</div><a href='/'>Go Back</a>");
    res.render("nomessage");
    return;
  }
  res.render("message", {message: messages[0]});
});

module.exports = router;