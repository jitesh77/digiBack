"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = __importDefault(require("async"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const passport_1 = __importDefault(require("passport"));
const User_1 = __importDefault(require("../models/User"));
const models_1 = require("../models");
const UserBox_1 = require("../models/UserBox");
const isAlphanumeric = require("is-alphanumeric");
const md5 = require("md5");
const request = require("express-validator");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
    accessKeyId: "AKIAJB2HNIBACPTH7RZQ",
    secretAccessKey: "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",
    region: "us-east-2"
});
/**
 * GET /login
 * Login page.
 */
exports.getLogin = (req, res) => {
    if (req.user) {
        return res.redirect("/");
    }
    res.render("account/login", {
        title: "Login"
    });
};
/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {
    req.assert("email", "Email is not valid").isEmail();
    req.assert("password", "Password cannot be blank").notEmpty();
    req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
    const errors = req.validationErrors();
    if (errors) {
        return res.send({ result: false, message: errors });
    }
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({ result: false, message: info.message });
        }
        req.logIn(user, err => {
            if (err) {
                return next(err);
            }
            // const msg = {
            //   to: "anoopa95@gmail.com",
            //   from: "reply@digiwage.org",
            //   subject: "Sending with SendGrid is Fun",
            //   templateId: "d-21bdbd6d0b6b4b79b28f092e6b6f2689",
            //   // substitutionWrappers: ["{{", "}}"],
            //   // substitutionWrappers: ["{{", "}}"],
            //   dynamic_template_data: {
            //     name: "Anoop",
            //     city: "Noida"
            //   }
            // };
            // sgMail.send(msg);
            return res.send({ result: true, message: "Logged in!", data: user });
        });
    })(req, res, next);
};
/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
    // console.log(req.user);
    req.logout();
    res.send({ result: true, message: "Adios!" });
};
/**
 * GET /signup
 * Signup page.
 */
exports.getSignup = (req, res) => {
    if (req.user) {
        return res.redirect("/");
    }
    res.render("account/signup", {
        title: "Create Account"
    });
};
/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = (req, res, next) => {
    req.assert("email", "Email is not valid").isEmail();
    req
        .assert("password", "Password must be at least 4 characters long")
        .len({ min: 4 });
    req
        .assert("confirmPassword", "Passwords do not match")
        .equals(req.body.password);
    req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
    const errors = req.validationErrors();
    if (errors) {
        return res.send({ result: false, message: errors });
    }
    // const token = createVerificationToken();
    const token = crypto_1.default.randomBytes(16).toString("hex");
    // console.log(token);
    const user = new User_1.default({
        email: req.body.email,
        password: req.body.password,
        publicAddress: req.body.pubAddress,
        verificationToken: token
    });
    // console.log(user);
    User_1.default.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            return res.send({
                result: false,
                message: "Account with that email address already exists."
            });
        }
        user.save(err => {
            if (err) {
                return next(err);
            }
            /*==================== send grid message ====================*/
            // const msg = {
            //   to: req.body.email,
            //   from: "info@digiwage.org",
            //   subject: "Email Verification",
            //   templateId: "d-21bdbd6d0b6b4b79b28f092e6b6f2689",
            //   dynamic_template_data: {
            //     link: `http://192.168.1.104:4200/verify/${req.body.email}/${token}`
            //   }
            // };
            // sgMail.send(msg);
            req.logIn(user, err => {
                if (err) {
                    return next(err);
                }
                res.send({ result: true, message: "Welcome to the team!" });
            });
        });
    });
};
/**
 * POST /signup
 * Create a new local account.
 */
exports.postWalletSignup = (req, res, next) => {
    req.assert("email", "Email is not valid").isEmail();
    req
        .assert("password", "Password must be at least 4 characters long")
        .len({ min: 4 });
    req
        .assert("username", "Username must be at least 3 characters long")
        .len({ min: 3 });
    // req
    //   .assert("confirmPassword", "Passwords do not match")
    //   .equals(req.body.password);
    req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
    console.log(typeof req.body.username);
    const errors = req.validationErrors();
    if (!isAlphanumeric(req.body.username)) {
        return res.send({
            result: false,
            message: "Username should be alphanumeric"
        });
    }
    if (errors) {
        return res.send({
            result: false,
            message: "Please enter a valid email, password and username"
        });
    }
    User_1.default.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }, (err, existingUser) => {
        if (err) {
            return res.send({
                result: false,
                message: "Error in searching for matching username"
            });
        }
        if (existingUser) {
            if (existingUser.username == req.body.username) {
                return res.send({
                    result: false,
                    message: "Username already exists"
                });
            }
            else {
                return res.send({
                    result: false,
                    message: "Email already exists"
                });
            }
        }
        else {
            // const token = createVerificationToken();
            const token = crypto_1.default.randomBytes(16).toString("hex");
            // console.log(token);
            const user = new User_1.default({
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
                verificationToken: token
            });
            // console.log(user);
            user.save(err => {
                if (err) {
                    return next(err);
                }
                const msg = {
                    to: req.body.email,
                    from: "info@digiwage.org",
                    subject: "Email Verification",
                    templateId: "d-21bdbd6d0b6b4b79b28f092e6b6f2689",
                    dynamic_template_data: {
                        link: `http://192.168.1.104:4200/verify/${req.body.email}/${token}`
                    }
                };
                sgMail.send(msg);
                return res.send({
                    result: true,
                    message: "User Saved"
                });
            });
        }
    });
};
// const createVerificationToken
//  = crypto.randomBytes(16, (err, buf) => {
//     const t = buf.toString("hex");
//     done(err, token);
//   });
//   // return token;
exports.verifyUser = (req, res) => {
    const email = req.params.email;
    const token = req.params.token;
    User_1.default.findOne({ email: email }, (err, user) => {
        if (err) {
            return res.send({
                result: false,
                message: "Error in verification try again"
            });
        }
        if (user.verificationToken == token) {
            user.hasEmailVerified = true;
            user.save(err => {
                if (err) {
                    return res.send({
                        result: false,
                        message: "Error, please try again"
                    });
                }
            });
        }
        else {
            return res.send({
                result: false,
                message: "Verification token error , Please create a new one"
            });
        }
    });
};
/**
 * GET /account
 * Profile page.
 */
exports.getAccount = (req, res) => {
    res.render("account/profile", {
        title: "Account Management"
    });
};
/**
 * POST /account/profile
 * Update profile information.
 */
// FIXME: postUpdateProfile and postAddDetails can be made one function
/**
 * POST /account/password
 * Update current password.
 */
exports.postUpdatePassword = (req, res, next) => {
    req
        .assert("password", "Password must be at least 4 characters long")
        .len({ min: 4 });
    req
        .assert("confirmPassword", "Passwords do not match")
        .equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        req.flash("errors", errors);
        return res.redirect("/account");
    }
    User_1.default.findById(req.user.id, (err, user) => {
        if (err) {
            return next(err);
        }
        user.password = req.body.password;
        user.save((err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", { msg: "Password has been changed." });
            res.redirect("/account");
        });
    });
};
/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = (req, res, next) => {
    User_1.default.remove({ _id: req.user.id }, err => {
        if (err) {
            return next(err);
        }
        req.logout();
        req.flash("info", { msg: "Your account has been deleted." });
        res.redirect("/");
    });
};
/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
// export let getOauthUnlink = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const provider = req.params.provider;
//   User.findById(req.user.id, (err, user: any) => {
//     if (err) {
//       return next(err);
//     }
//     user[provider] = undefined;
//     user.tokens = user.tokens.filter(
//       (token: AuthToken) => token.kind !== provider
//     );
//     user.save((err: WriteError) => {
//       if (err) {
//         return next(err);
//       }
//       req.flash("info", { msg: `${provider} account has been unlinked.` });
//       res.redirect("/account");
//     });
//   });
// };
/**
 * GET /reset/:token
 * Reset Password page.
 */
exports.getReset = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    User_1.default.findOne({ passwordResetToken: req.params.token })
        .where("passwordResetExpires")
        .gt(Date.now())
        .exec((err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash("errors", {
                msg: "Password reset token is invalid or has expired."
            });
            return res.redirect("/forgot");
        }
        res.render("account/reset", {
            title: "Password Reset"
        });
    });
};
/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = (req, res, next) => {
    req
        .assert("password", "Password must be at least 4 characters long.")
        .len({ min: 4 });
    req.assert("confirm", "Passwords must match.").equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        return res.send({
            result: false,
            message: "Error in reseting password"
        });
    }
    async_1.default.waterfall([
        function resetPassword(done) {
            User_1.default.findOne({ passwordResetToken: req.params.token })
                .where("passwordResetExpires")
                .gt(Date.now())
                .exec((err, user) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.send({
                        result: false,
                        message: "Token expired please request a new one"
                    });
                }
                user.password = req.body.password;
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                user.save((err) => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Token expired please request a new one"
                        });
                    }
                    return res.send({
                        result: true,
                        message: "Password reset successful"
                    });
                });
            });
        },
        function sendResetPasswordEmail(user, done) {
            const transporter = nodemailer_1.default.createTransport({
                service: "SendGrid",
                auth: {
                    user: process.env.SENDGRID_USER,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
            const mailOptions = {
                to: user.email,
                from: "noReply@digiwage.org",
                subject: "Your password has been changed",
                text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
            };
            transporter.sendMail(mailOptions, err => {
                req.flash("success", {
                    msg: "Success! Your password has been changed."
                });
                done(err);
            });
        }
    ], err => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};
/**
 * GET /forgot
 * Forgot Password page.
 */
exports.getForgot = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    res.render("account/forgot", {
        title: "Forgot Password"
    });
};
/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.postForgot = (req, res, next) => {
    req.assert("email", "Please enter a valid email address.").isEmail();
    req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
    const errors = req.validationErrors();
    if (errors) {
        return res.send({
            result: false,
            message: "Error in sending reset link"
        });
    }
    async_1.default.waterfall([
        function createRandomToken(done) {
            crypto_1.default.randomBytes(16, (err, buf) => {
                const token = buf.toString("hex");
                done(err, token);
            });
        },
        function setRandomToken(token, done) {
            User_1.default.findOne({ email: req.body.email }, (err, user) => {
                if (err) {
                    return res.send({
                        result: false,
                        message: "Error in finding account"
                    });
                }
                if (!user) {
                    return res.send({
                        result: false,
                        message: "No account with this email id"
                    });
                }
                user.passwordResetToken = token;
                user.passwordResetExpires = Date.now() + 3600000; // 1 hour
                user.save((err) => {
                    done(err, token, user);
                });
            });
        },
        function sendForgotPasswordEmail(token, user, done) {
            /*==================== send grid message ====================*/
            const msg = {
                to: req.body.email,
                from: "info@digiwage.org",
                subject: "Password Reset Request",
                templateId: "d-31c6ad67c8b94b0192af961afe174c5f",
                dynamic_template_data: {
                    link: `http://192.168.1.104:4200/reset/${req.body.email}/${token}`
                }
            };
            sgMail.send(msg);
            return res.send({
                result: true,
                message: "Reset Link sent to email id"
            });
        }
    ], err => {
        if (err) {
            return res.send({
                result: false,
                message: "Error in sending reset link"
            });
        }
    });
};
exports.currentUser = (req, res, next) => {
    // console.log(req.user);
    const data = req.user;
    if (req.user) {
        return res.send({
            result: true,
            data: data
        });
    }
    else {
        return res.send({
            result: false,
            message: "No user logged in"
        });
    }
};
exports.getUserBox = (req, res, next) => {
    const userId = req.params.id;
    User_1.default.findById(userId, "-password", (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: err
            });
        }
        if (data) {
            // let userData = new UserBox ( {
            //   userData.fname = data.fname;
            // })
            // console.log(data);
            const userData = new UserBox_1.UserBox();
            userData._id = data._id;
            userData.fname = data.fname;
            userData.lname = data.lname;
            // picture: string;
            userData.tagline = data.tagline;
            userData.location = data.location;
            userData.username = data.username;
            userData.profilePicture = data.profilePicture;
            userData.description = data.description;
            userData.skills = data.skills;
            userData.hourlyRate = data.hourlyRate;
            userData.rating = data.rating;
            userData.earned = data.received;
            userData.buyerRequestCount = data.buyersRequest.length;
            userData.microjobsCount = data.microjobs.length;
            userData.hourlyCount = data.hourly.length;
            return res.send({
                result: true,
                data: userData
            });
        }
    });
};
exports.findUername = (req, res, next) => {
    User_1.default.findOne({ username: req.params.username.toLowerCase() }, (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: err
            });
        }
        else {
            if (data) {
                return res.send({
                    result: false,
                    message: "Username already Exists"
                });
            }
            else {
                return res.send({
                    result: true,
                    message: "Username Available"
                });
            }
        }
    });
};
exports.postAddDetails = (req, res, next) => {
    // req.assert("email", "Please enter a valid email address.").isEmail();
    // req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
    // console.log(req.body);
    User_1.default.findById(req.user.id, (err, user) => {
        if (err) {
            // console.log(err);
            return res.send({
                result: false,
                message: "error"
            });
        }
        // user.email = req.body.email || "";
        // user.profile.name = req.body.name || "";
        user.profile.gender = req.body.gender || "";
        user.profile.country = req.body.country || "";
        // user.profile.website = req.body.website || "";
        user.username = req.body.username.toLowerCase();
        user.description = req.body.description;
        user.fname = req.body.firstname;
        user.lname = req.body.lastname;
        user.tagline = req.body.tagline;
        user.rating = 0;
        user.ratingCount = 0;
        if (req.body.profilePicture == "null") {
            user.profilePicture =
                "https://s3.us-east-2.amazonaws.com/digiimgbucket/uploads/placeholder/placeholder.jpg";
        }
        else {
            user.profilePicture = req.body.profilePicture;
        }
        user.save((err) => {
            if (err) {
                // console.log(err);
                return res.send({
                    result: false,
                    message: err
                });
            }
            return res.send({
                result: true,
                message: "Successfully saved"
            });
        });
    });
};
exports.postUpdateDetails = (req, res, next) => {
    User_1.default.findById(req.user.id, (err, user) => {
        console.log(err);
        if (err) {
            return res.send({
                result: false,
                message: err
            });
        }
        // console.log(req.body);
        user.fname = req.body.firstname;
        user.lname = req.body.lastname;
        user.profile.gender = req.body.gender;
        user.profile.country = req.body.country;
        user.location = req.body.country;
        user.description = req.body.description;
        user.skills = JSON.parse(req.body.skills);
        user.hourlyRate = req.body.hourlyRate || 0;
        user.tagline = req.body.tagline;
        user.profilePicture = req.body.profilePicture || user.profilePicture;
        user.save((err) => {
            console.log(err);
            if (err) {
                return res.send({
                    result: false,
                    message: err
                });
            }
            return res.send({
                result: true,
                message: "Successfully saved"
            });
        });
    });
};
exports.getSignedUrl = (req, res, next) => {
    const date = Date.now().toString();
    const key = md5(date + req.params.filename);
    // console.log(key);
    const signedUrlExpireSeconds = 60 * 60;
    const myBucket = "digiimgbucket";
    const myKey = "uploads/images/" + key + req.params.filename;
    const params = {
        Bucket: myBucket,
        Key: myKey,
        Expires: signedUrlExpireSeconds,
        ACL: "public-read",
        ContentType: "image/jpg"
    };
    s3.getSignedUrl("putObject", params, function (err, url) {
        if (err) {
            // console.log("Error getting presigned url from AWS S3");
            return res.send({ result: false, message: "Pre-Signed URL error" });
        }
        else {
            let fileurls = {};
            fileurls = url;
            // console.log("Presigned URL: ", fileurls[0]);
            return res.send({
                result: true,
                data: fileurls,
                key: myKey
            });
        }
    });
};
/* ============================================================
   ==================== getSmallUserDetails ====================*/
exports.getSmallUserDetails = (req, res) => {
    const id = req.params.id;
    User_1.default.findById(id, " fname lname profilePicture", (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: "Error in finding user"
            });
        }
        return res.send({
            result: true,
            data: data
        });
    });
};
/* ============================================================
      ==================== wallet====================*/
// update public address, key
exports.postUpdatePublicAddress = (req, resp, next) => {
    const dps = require("../util/decpaylib");
    const username = req.query.username;
    const address = req.query.address;
    const publicKey = req.query.publicKey;
    // init dps
    dps.init("149.28.207.96", 46006, "digiwagerpc", "4fuZjYqBzzU9EmudEstNQtset9B4u9mg8ckJTmAnJsbD");
    // dps.getInfo(function(res: any, err: Error) {
    //   console.log("getinfo = %j", res);
    // });
    dps.IsValidPubKey(address, publicKey, 30, // FIXED, 0 for bitcoin, 30 for Digiwage addresses
    function (res, err) {
        if (err)
            return resp.send({
                result: false,
                message: "invalid address pubkey pair!"
            });
        User_1.default.findOne({ username: username.toLowerCase() }, (err, user) => {
            if (err) {
                return resp.send({
                    result: false,
                    message: "failed to fetch from database"
                });
            }
            if (user == undefined) {
                return resp.send({
                    result: false,
                    message: "no such user"
                });
            }
            user.publicKey = publicKey;
            user.save((err) => {
                if (err) {
                    return resp.send({
                        result: false,
                        message: err
                    });
                }
                return resp.send({
                    result: true,
                    message: "Successfully updated"
                });
            });
        });
    });
};
exports.getSendingEscrow = (req, res, next) => {
    // AcceptedHourlyOrderModel,
    // AcceptedHourlyOrder,
    // AcceptedMicrojobOrder,
    // AcceptedMicrojobOrderModel,
    // AcceptedRequestOrder,
    // AcceptedRequestOrderModel
    const username = req.query.username;
    const address = req.query.address;
    const publicKey = req.query.publicKey;
    if (username === undefined || address === undefined) {
        return res.send({
            result: false,
            message: "no username or address foundin request"
        });
    }
    validateKeyAndAddress(publicKey, address)
        .then(promiseResult => {
        const isValidUser = User_1.default.find({
            username: username,
            publicAddress: address
        });
        const acceptedHourly = models_1.AcceptedHourlyOrder.aggregate({
            $match: {
                senderUserName: username,
                status: 2,
                escrow: false
            }
        }, {
            $project: {
                _id: 0,
                DealId: "$_id",
                EscrowAmount: "$EscrowAmount",
                EscrowAddress: "$EscrowAddress"
            }
        });
        const acceptedMicroJob = models_1.AcceptedMicrojobOrder.aggregate({
            $match: {
                senderUserName: username,
                status: 2,
                escrow: false
            }
        }, {
            $project: {
                _id: 0,
                DealId: "$_id",
                EscrowAmount: "$EscrowAmount",
                EscrowAddress: "$EscrowAddress"
            }
        });
        const acceptedRequests = models_1.AcceptedRequestOrder.aggregate({
            $match: {
                authorUserName: username,
                status: 2,
                escrow: false
            }
        }, {
            $project: {
                _id: 0,
                DealId: "$_id",
                EscrowAmount: "$EscrowAmount",
                EscrowAddress: "$EscrowAddress"
            }
        });
        Promise.all([
            isValidUser,
            acceptedHourly,
            acceptedMicroJob,
            acceptedRequests
        ])
            .then(d => {
            if (d[0].length !== 1) {
                return res.send({
                    result: false,
                    message: "no such user"
                });
            }
            return res.send({
                result: true,
                data: d[1].concat(d[2]).concat(d[3])
            });
        })
            .catch(e => {
            return res.send({
                result: false,
                message: "failed to fetch"
            });
        });
    })
        .catch(promiseError => {
        return res.send({
            result: false,
            message: "Error in validating address and key"
        });
    });
};
/*
Inputs
*/
// @username
// @publicKey
// @address
// @DealId
// @EscrowTxId: transaction id.
exports.setEscrowTxId = (req, res) => {
    const username = req.body.username;
    const publicKey = req.body.publicKey;
    const publicAddress = req.body.address;
    const type = req.body.type;
    const dealId = req.body.dealId;
    const escrowTxId = req.body.escrowTxId;
    validateKeyAndAddress(publicKey, publicAddress)
        .then(promiseResult => {
        User_1.default.findOne({ username: username, publicAddress: publicAddress }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Error in fetching documents"
                });
            }
            if (data) {
                if (type == "hourly") {
                    models_1.AcceptedHourlyOrder.update({ _id: dealId, senderUserName: username }, {
                        $set: {
                            escrowTxId: escrowTxId,
                            escrow: true,
                            dealStatus: "deposited"
                        }
                    }, (err, data) => {
                        if (err) {
                            return res.send({
                                result: false,
                                message: "Adding excrowTxId unsuccessful "
                            });
                        }
                        return res.send({
                            result: true,
                            message: "successfully Added excrowTxId"
                        });
                    });
                }
                if (type == "microjob") {
                    models_1.AcceptedMicrojobOrder.update({ _id: dealId, senderUserName: username }, {
                        $set: {
                            escrowTxId: escrowTxId,
                            escrow: true,
                            dealStatus: "deposited"
                        }
                    }, (err, data) => {
                        if (err) {
                            return res.send({
                                result: false,
                                message: "Adding excrowTxId unsuccessful "
                            });
                        }
                        return res.send({
                            result: true,
                            message: "successfully Added excrowTxId"
                        });
                    });
                }
                if (type == "buyerRequest") {
                    models_1.AcceptedRequestOrder.update({ _id: dealId, authorUserName: username }, {
                        $set: {
                            escrowTxId: escrowTxId,
                            escrow: true,
                            dealStatus: "deposited"
                        }
                    }, (err, data) => {
                        if (err) {
                            return res.send({
                                result: false,
                                message: "Adding excrowTxId unsuccessful "
                            });
                        }
                        return res.send({
                            result: true,
                            message: "successfully Added excrowTxId"
                        });
                    });
                }
            }
            else {
                return res.send({
                    result: false,
                    message: "Wrong Credentials"
                });
            }
        });
    })
        .catch(error => {
        return res.send({
            result: false,
            message: "Error in validating address and key"
        });
    });
};
const validateKeyAndAddress = (key, address) => {
    return new Promise((resolve, reject) => {
        dps.IsValidPubKey(address, key, 30, // FIXED, 0 for bitcoin, 30 for Digiwage addresses
        function (res, err) {
            if (err) {
                reject(false);
            }
            else {
                resolve(true);
            }
        });
    });
};
const validUser = (username, address) => {
    return new Promise((resolve, reject) => {
        User_1.default.findOne({ username: username, publicAddress: address }, (err, data) => {
            if (err) {
                reject(false);
            }
            else {
                resolve(true);
            }
        });
    });
};
// senderUserName: username,
//             status: 3,
//             completedAuthor: true,
//             completedSender: true
exports.getPendingBuyerSignature = (req, res) => {
    const username = req.query.username;
    const address = req.query.address;
    const publicKey = req.query.publicKey;
    const type = req.query.type;
    if (username === undefined || address === undefined) {
        return res.send({
            result: false,
            message: "no username or address foundin request"
        });
    }
    validateKeyAndAddress(publicKey, address)
        .then(promiseResult => {
        validUser(username, address)
            .then(result => {
            if (type == "hourly") {
                models_1.AcceptedHourlyOrder.find({
                    senderUserName: username,
                    status: 3,
                    completedAuthor: true,
                    completedSender: true
                }, "EscrowAmount EscrowTxId RedeemScript authorId", (err, data) => {
                    const mapping = data.map((d) => {
                        const test = {};
                        test["DealId"] = d._id;
                        test["EscrowAmount"] = d.EscrowAmount;
                        test["EscrowTxId"] = d.EscrowTxId;
                        test["RedeemScript"] = d.RedeemScript;
                        test["type"] = d.type;
                        return getPublicAddress(d.authorId).then((userResult) => {
                            test["sellerPubAddress"] = userResult.publicAddress;
                            console.log(test);
                            return test;
                        });
                        // console.log();
                    });
                    Promise.all(mapping).then(ttt => {
                        console.log(ttt);
                        return res.send({
                            result: true,
                            data: ttt
                        });
                    });
                });
            }
            /*==================== microjob====================*/
            if (type == "microjob") {
                models_1.AcceptedHourlyOrder.find({
                    senderUserName: username,
                    status: 3,
                    completedAuthor: true,
                    completedSender: true
                }, "EscrowAmount EscrowTxId RedeemScript authorId", (err, data) => {
                    const mapping = data.map((d) => {
                        const test = {};
                        test["DealId"] = d._id;
                        test["EscrowAmount"] = d.EscrowAmount;
                        test["EscrowTxId"] = d.EscrowTxId;
                        test["RedeemScript"] = d.RedeemScript;
                        test["type"] = d.type;
                        return getPublicAddress(d.authorId).then((userResult) => {
                            test["sellerPubAddress"] = userResult.publicAddress;
                            console.log(test);
                            return test;
                        });
                        // console.log();
                    });
                    Promise.all(mapping).then(resultData => {
                        // console.log(ttt);
                        return res.send({
                            result: true,
                            data: resultData
                        });
                    });
                });
            }
            /*==================== request ====================*/
            if (type == "buyerRequest") {
                models_1.AcceptedHourlyOrder.find({
                    authorUserName: username,
                    status: 3,
                    completedAuthor: true,
                    completedSender: true
                }, "EscrowAmount EscrowTxId RedeemScript senderId", (err, data) => {
                    const mapping = data.map((d) => {
                        const test = {};
                        test["DealId"] = d._id;
                        test["type"] = d.type;
                        test["EscrowAmount"] = d.EscrowAmount;
                        test["EscrowTxId"] = d.EscrowTxId;
                        test["RedeemScript"] = d.RedeemScript;
                        return getPublicAddress(d.senderId).then((userResult) => {
                            test["sellerPubAddress"] = userResult.publicAddress;
                            console.log(test);
                            return test;
                        });
                        // console.log();
                    });
                    Promise.all(mapping).then(resultData => {
                        // console.log(ttt);
                        return res.send({
                            result: true,
                            data: resultData
                        });
                    });
                });
            }
        })
            .catch(error => {
            return res.send({
                result: false,
                message: "Error in matching username and publicAddress"
            });
        });
    })
        .catch(promiseError => {
        return res.send({
            result: false,
            message: "Error in validating address and key"
        });
    });
};
/* ============================================================
    ==================== get public address====================*/
const getPublicAddress = (id) => {
    return new Promise((resolve, reject) => {
        User_1.default.findOne({ _id: id }, "publicAddress", (err, data) => {
            if (err) {
                reject(false);
            }
            resolve(data);
        });
    });
};
/* ============================================================
   ==================== setPaymentSignature1 ====================*/
exports.setPaymentSignature1 = (req, res) => {
    const username = req.body.username;
    const publicKey = req.body.publicKey;
    const publicAddress = req.body.address;
    const type = req.body.type;
    const dealId = req.body.DealId;
    const PaymentSignature1 = req.body.PaymentSignature1;
    validateKeyAndAddress(publicKey, publicAddress)
        .then(promiseResult => {
        User_1.default.findOne({ username: username, publicAddress: publicAddress }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Error in fetching documents"
                });
            }
            if (data) {
                if (type == "hourly") {
                    models_1.AcceptedHourlyOrder.update({ _id: dealId }, {
                        $set: {
                            PaymentSignature1: PaymentSignature1,
                            dealStatus: "pending seller signature"
                        }
                    }, (err, data) => {
                        if (err) {
                            return res.send({
                                result: false,
                                message: "Adding paymentSignature1 unsuccessful "
                            });
                        }
                        return res.send({
                            result: true,
                            message: "successfully Added paymentSignature1"
                        });
                    });
                }
                if (type == "microjob") {
                    models_1.AcceptedMicrojobOrder.update({ _id: dealId }, {
                        $set: {
                            PaymentSignature1: PaymentSignature1,
                            dealStatus: "pending seller signature"
                        }
                    }, (err, data) => {
                        if (err) {
                            return res.send({
                                result: false,
                                message: "Adding paymentSignature1 unsuccessful "
                            });
                        }
                        return res.send({
                            result: true,
                            message: "successfully Added paymentSignature1"
                        });
                    });
                }
                if (type == "buyerRequest") {
                    models_1.AcceptedRequestOrder.update({ _id: dealId }, {
                        $set: {
                            PaymentSignature1: PaymentSignature1,
                            dealStatus: "pending seller signature"
                        }
                    }, (err, data) => {
                        if (err) {
                            return res.send({
                                result: false,
                                message: "Adding paymentSignature1 unsuccessful "
                            });
                        }
                        return res.send({
                            result: true,
                            message: "successfully Added paymentSignature1"
                        });
                    });
                }
            }
            else {
                return res.send({
                    result: false,
                    message: "Wrong Credentials"
                });
            }
        });
    })
        .catch(error => {
        return res.send({
            result: false,
            message: "Error in validating address and key"
        });
    });
};
/* ============================================================
   ==================== getPendingSellerSignature ====================*/
exports.getPendingSellerSignature = (req, res) => {
    const username = req.query.username;
    const address = req.query.address;
    const publicKey = req.query.publicKey;
    if (username === undefined || address === undefined) {
        return res.send({
            result: false,
            message: "no username or address foundin request"
        });
    }
    validateKeyAndAddress(publicKey, address)
        .then(promiseResult => {
        const isValidUser = User_1.default.find({
            username: username,
            publicAddress: address
        });
        const acceptedHourly = models_1.AcceptedHourlyOrder.aggregate({
            $match: {
                authorUserName: username,
                status: 3,
                completedAuthor: true,
                completedSender: true,
                dealStatus: "pending seller signature"
            }
        }, {
            $project: {
                _id: 0,
                DealId: "$_id",
                EscrowTxId: "$EscrowTxId",
                RedeemScript: "$RedeemScript",
                PaymentSignature1: "$PaymentSignature1"
            }
        });
        const acceptedMicroJob = models_1.AcceptedMicrojobOrder.aggregate({
            $match: {
                authorUserName: username,
                status: 3,
                completedAuthor: true,
                completedSender: true,
                dealStatus: "pending seller signature"
            }
        }, {
            $project: {
                _id: 0,
                DealId: "$_id",
                EscrowTxId: "$EscrowTxId",
                RedeemScript: "$RedeemScript",
                PaymentSignature1: "$PaymentSignature1"
            }
        });
        const acceptedRequests = models_1.AcceptedRequestOrder.aggregate({
            $match: {
                senderUserName: username,
                status: 3,
                completedAuthor: true,
                completedSender: true,
                dealStatus: "pending seller signature"
            }
        }, {
            $project: {
                _id: 0,
                DealId: "$_id",
                EscrowTxId: "$EscrowTxId",
                RedeemScript: "$RedeemScript",
                PaymentSignature1: "$PaymentSignature1"
            }
        });
        Promise.all([
            isValidUser,
            acceptedHourly,
            acceptedMicroJob,
            acceptedRequests
        ])
            .then(d => {
            if (d[0].length !== 1) {
                return res.send({
                    result: false,
                    message: "no such user"
                });
            }
            return res.send({
                result: true,
                data: d[1].concat(d[2]).concat(d[3])
            });
        })
            .catch(e => {
            return res.send({
                result: false,
                message: "failed to fetch"
            });
        });
    })
        .catch(promiseError => {
        return res.send({
            result: false,
            message: "Error in validating address and key"
        });
    });
};
/* ============================================================
   ==================== setPaymentTxId ====================*/
exports.setPaymentTxId = (req, res) => {
    const username = req.body.username;
    const publicKey = req.body.publicKey;
    const publicAddress = req.body.address;
    const type = req.body.type;
    const dealId = req.body.DealId;
    const PaymentTxId = req.body.PaymentTxId;
    validateKeyAndAddress(publicKey, publicAddress)
        .then(promiseResult => {
        User_1.default.findOne({ username: username, publicAddress: publicAddress }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Error in fetching documents"
                });
            }
            if (data) {
                if (type == "hourly") {
                    models_1.AcceptedHourlyOrder.update({ _id: dealId }, {
                        $set: {
                            PaymentTxId: PaymentTxId,
                            dealStatus: "finished",
                            status: 4
                        }
                    }, (err, data) => {
                        if (err) {
                            return res.send({
                                result: false,
                                message: "Adding PaymentTxId unsuccessful "
                            });
                        }
                        return res.send({
                            result: true,
                            message: "successfully Added PaymentTxId"
                        });
                    });
                }
                if (type == "microjob") {
                    models_1.AcceptedMicrojobOrder.update({ _id: dealId }, {
                        $set: {
                            PaymentTxId: PaymentTxId,
                            dealStatus: "finished",
                            status: 4
                        }
                    }, (err, data) => {
                        if (err) {
                            return res.send({
                                result: false,
                                message: "Adding PaymentTxId unsuccessful "
                            });
                        }
                        return res.send({
                            result: true,
                            message: "successfully Added PaymentTxId"
                        });
                    });
                }
                if (type == "buyerRequest") {
                    models_1.AcceptedRequestOrder.update({ _id: dealId }, {
                        $set: {
                            PaymentTxId: PaymentTxId,
                            dealStatus: "finished",
                            status: 4
                        }
                    }, (err, data) => {
                        if (err) {
                            return res.send({
                                result: false,
                                message: "Adding PaymentTxId unsuccessful "
                            });
                        }
                        return res.send({
                            result: true,
                            message: "successfully Added PaymentTxId"
                        });
                    });
                }
            }
            else {
                return res.send({
                    result: false,
                    message: "Wrong Credentials"
                });
            }
        });
    })
        .catch(error => {
        return res.send({
            result: false,
            message: "Error in validating address and key"
        });
    });
};
/* ============================================================
   ==================== get pending mediated deals ====================*/
exports.getPendingMediatedDeals = (req, res, next) => {
    // AcceptedHourlyOrderModel,
    // AcceptedHourlyOrder,
    // AcceptedMicrojobOrder,
    // AcceptedMicrojobOrderModel,
    // AcceptedRequestOrder,
    // AcceptedRequestOrderModel
    const username = req.query.username;
    const address = req.query.address;
    const publicKey = req.query.publicKey;
    if (username === undefined || address === undefined) {
        return res.send({
            result: false,
            message: "no username or address foundin request"
        });
    }
    validateKeyAndAddress(publicKey, address)
        .then(promiseResult => {
        const isValidUser = User_1.default.find({
            username: username,
            publicAddress: address
        });
        const acceptedHourly = models_1.AcceptedHourlyOrder.aggregate({
            $match: {
                $or: [{ senderUserName: username }, { authorUserName: username }],
                status: -1,
                mediated: true
            }
        }, {
            $project: {
                _id: 0,
                DealId: "$_id",
                RedeemScript: "$RedeemScript",
                EscrowTxId: "$EscrowTxId",
                PaymentSignature1: "$PaymentSignature1",
                mediatedPercentage: "$mediatedPercentage"
            }
        });
        const acceptedMicroJob = models_1.AcceptedMicrojobOrder.aggregate({
            $match: {
                $or: [{ senderUserName: username }, { authorUserName: username }],
                status: -1,
                mediated: true
            }
        }, {
            $project: {
                _id: 0,
                DealId: "$_id",
                RedeemScript: "$RedeemScript",
                EscrowTxId: "$EscrowTxId",
                PaymentSignature1: "$PaymentSignature1",
                mediatedPercentage: "$mediatedPercentage"
            }
        });
        const acceptedRequests = models_1.AcceptedRequestOrder.aggregate({
            $match: {
                $or: [{ senderUserName: username }, { authorUserName: username }],
                status: -1,
                mediated: true
            }
        }, {
            $project: {
                _id: 0,
                DealId: "$_id",
                RedeemScript: "$RedeemScript",
                EscrowTxId: "$EscrowTxId",
                PaymentSignature1: "$PaymentSignature1",
                mediatedPercentage: "$mediatedPercentage"
            }
        });
        Promise.all([
            isValidUser,
            acceptedHourly,
            acceptedMicroJob,
            acceptedRequests
        ])
            .then(d => {
            if (d[0].length !== 1) {
                return res.send({
                    result: false,
                    message: "no such user"
                });
            }
            return res.send({
                result: true,
                data: d[1].concat(d[2]).concat(d[3])
            });
        })
            .catch(e => {
            return res.send({
                result: false,
                message: "failed to fetch"
            });
        });
    })
        .catch(promiseError => {
        return res.send({
            result: false,
            message: "Error in validating address and key"
        });
    });
};
//  test
exports.testing = (req, res) => {
    const username = req.query.username;
    console.log("========================");
    console.log(req.query.username);
    models_1.AcceptedMicrojobOrder.find({
        senderUserName: username
        // status: 3,
        // completedAuthor: true,
        // completedSender: true
    }, "EscrowAmount EscrowTxId RedeemScript authorId", (err, data) => {
        const mapping = data.map((d) => {
            const test = {};
            test["EscrowAmount"] = d.authorId;
            return getPublicAddress(d.authorId).then((userResult) => {
                test["sellerPubAddress"] = userResult._id;
                console.log(test);
                return test;
            });
            // console.log();
        });
        Promise.all(mapping).then(ttt => {
            console.log(ttt);
            return res.send({
                result: true,
                data: ttt
            });
        });
    });
};
//# sourceMappingURL=user.js.map