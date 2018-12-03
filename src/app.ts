import express from "express";
import compression from "compression"; // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import logger from "./util/logger";
import lusca from "lusca";
import dotenv from "dotenv";
// import mongo from "connect-mongo";
import redisStore from "connect-redis";
import flash from "express-flash";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import expressValidator from "express-validator";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
const dps = require("./util/decpaylib");
// const io = require("socket.io")(http);

// const MongoStore = mongo(session);
const RedisStore = redisStore(session);

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.example" });

// (route handler)
import routes from "./routes/routes";
// import * as homeController from "./controllers/home";
// import * as userController from "./controllers/user";
// import * as apiController from "./controllers/api";
// import * as contactController from "./controllers/contact";

// API keys and Passport configuration
import * as passportConfig from "./config/passport";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose
  .connect(
    mongoUrl,
    { useMongoClient: true }
  )
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch(err => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    // process.exit();
  });

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new RedisStore({
      host: "127.0.0.1",
      port: 6379,
      prefix: "sess_",
      pass: ""
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("ALLOW-FROM http://192.168.1.104:4200"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
// app.use((req, res, next) => {
//   // After successful login, redirect back to the intended page
//   if (
//     !req.user &&
//     req.path !== "/login" &&
//     req.path !== "/signup" &&
//     !req.path.match(/^\/auth/) &&
//     !req.path.match(/\./)
//   ) {
//     req.session.returnTo = req.path;
//   } else if (req.user && req.path == "/account") {
//     req.session.returnTo = req.path;
//   }
//   next();
// });
// init dps
dps.init(
  "149.28.207.96",
  46006,
  "digiwagerpc",
  "4fuZjYqBzzU9EmudEstNQtset9B4u9mg8ckJTmAnJsbD"
);

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

routes(app, passportConfig);
/**
 * Primary app routes.
 */
/*
app.get("/api/", homeController.index);
//app.get("/api/login", userController.getLogin);
app.post("/api/login", userController.postLogin);
app.get("/api/logout", userController.logout);
//app.get("/api/forgot", userController.getForgot);
app.post("/api/forgot", userController.postForgot);
//app.get("/api/reset/:token", userController.getReset);
app.post("/api/reset/:token", userController.postReset);
//app.get("/api/signup", userController.getSignup);
app.post("/api/signup", userController.postSignup);
//app.get("/api/contact", contactController.getContact);
app.post("/api/contact", contactController.postContact);
app.get(
  "/api/account",
  passportConfig.isAuthenticated,
  userController.getAccount
);
app.post(
  "/api/account/profile",
  passportConfig.isAuthenticated,
  userController.postUpdateProfile
);
app.post(
  "/api/account/password",
  passportConfig.isAuthenticated,
  userController.postUpdatePassword
);
app.post(
  "/api/account/delete",
  passportConfig.isAuthenticated,
  userController.postDeleteAccount
);*/

// app.get(
//   "/api/account/unlink/:provider",
//   passportConfig.isAuthenticated,
//   userController.getOauthUnlink
// );

/**
 * API examples routes.
 */
// app.get("/api/api", apiController.getApi);
// app.get(
//   "/api/facebook",
//   passportConfig.isAuthenticated,
//   passportConfig.isAuthorized,
//   apiController.getFacebook
// );

/**
 * OAuth authentication routes. (Sign in)
 */
// app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
// app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
//   res.redirect(req.session.returnTo || "/");
// });

export default app;
