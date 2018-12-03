"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression")); // compresses requests
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const lusca_1 = __importDefault(require("lusca"));
const dotenv_1 = __importDefault(require("dotenv"));
// import mongo from "connect-mongo";
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_flash_1 = __importDefault(require("express-flash"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const express_validator_1 = __importDefault(require("express-validator"));
const bluebird_1 = __importDefault(require("bluebird"));
const secrets_1 = require("./util/secrets");
const dps = require("./util/decpaylib");
// const io = require("socket.io")(http);
// const MongoStore = mongo(session);
const RedisStore = connect_redis_1.default(express_session_1.default);
// Load environment variables from .env file, where API keys and passwords are configured
dotenv_1.default.config({ path: ".env.example" });
// (route handler)
const routes_1 = __importDefault(require("./routes/routes"));
// import * as homeController from "./controllers/home";
// import * as userController from "./controllers/user";
// import * as apiController from "./controllers/api";
// import * as contactController from "./controllers/contact";
// API keys and Passport configuration
const passportConfig = __importStar(require("./config/passport"));
// Create Express server
const app = express_1.default();
// Connect to MongoDB
const mongoUrl = secrets_1.MONGODB_URI;
mongoose_1.default.Promise = bluebird_1.default;
mongoose_1.default
    .connect(mongoUrl, { useMongoClient: true })
    .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
})
    .catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_validator_1.default());
app.use(express_session_1.default({
    resave: true,
    saveUninitialized: true,
    secret: secrets_1.SESSION_SECRET,
    store: new RedisStore({
        host: "127.0.0.1",
        port: 6379,
        prefix: "sess_",
        pass: ""
    })
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_flash_1.default());
app.use(lusca_1.default.xframe("ALLOW-FROM http://192.168.1.104:4200"));
app.use(lusca_1.default.xssProtection(true));
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
dps.init("149.28.207.96", 46006, "digiwagerpc", "4fuZjYqBzzU9EmudEstNQtset9B4u9mg8ckJTmAnJsbD");
app.use(express_1.default.static(path_1.default.join(__dirname, "public"), { maxAge: 31557600000 }));
routes_1.default(app, passportConfig);
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
exports.default = app;
//# sourceMappingURL=app.js.map