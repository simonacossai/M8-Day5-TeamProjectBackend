const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const UserSchema = require("../users/schema");
const jwt = require("jsonwebtoken");


const generateJWT = (payload) =>
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      (error, token) => {
        if (error) rej(error);
        res(token);
      }
    )
  );
const authenticate = async (user) => {
    try {
      const newAccessToken = await generateJWT({ _id: user._id });
  
      await user.save();
  
      return { token: newAccessToken };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }; 

passport.use(
  "spotify",
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID_SPOTIFY,
      clientSecret: process.env.CLIENT_SECRET_SPOTIFY,
      callbackURL: "http://localhost:3000/home",
    },
    async function (accessToken, profile, done) {
      try {
      
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
    "facebook",
    new FacebookStrategy(
      {
        clientID: process.env.CLIENT_ID_FB,
        clientSecret: process.env.CLIENT_SECRET_FB,
        callbackURL: "http://localhost:3000/home",
      },
      async function (accessToken, profile, done) {
        console.log(profile);
        try {
          const user = await UserSchema.findOne({
            email: profile.emails[0].value,
          });
         
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.serializeUser(function (user, next) {
    next(null, user);
  });