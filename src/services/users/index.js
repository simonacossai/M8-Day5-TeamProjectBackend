const express = require("express")
const passport = require("passport")

const UserModel = require("./schema")

const usersRouter = express.Router()

usersRouter.get("/", async (req, res, next) => {
  try {
    console.log(req.user)
    const users = await UserModel.find()
    res.send(users)
  } catch (error) {
    next(error)
  }
})
usersRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id)
    res.send(user)
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/me", async (req, res, next) => {
  try {
    res.send(req.user)
  } catch (error) {
    next(error)
  }
})

usersRouter.put("/me", async (req, res, next) => {
  try {
    const updates = Object.keys(req.body)
    updates.forEach(update => (req.user[update] = req.body[update]))
    await req.user.save()
    res.send(req.user)
  } catch (error) {
    next(error)
  }
})

usersRouter.delete("/me", async (req, res, next) => {
  try {
    await req.user.deleteOne(res.send("Deleted"))
  } catch (error) {
    next(error)
  }
})

usersRouter.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"],
  })
);
usersRouter.get(
  "/spotify/redirect",
  passport.authenticate("spotify"),
  async (req, res, next) => {
    try {
      res.status(200).redirect("http://localhost:3000/home");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
usersRouter.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile"],
  })
);

usersRouter.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  async (req, res, next) => {
    try {
      res.status(200).redirect("http://localhost:3000/home");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = usersRouter