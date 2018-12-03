"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const crypto_1 = __importDefault(require("crypto"));
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    verificationToken: String,
    hasData: Boolean,
    hasEmailVerified: Boolean,
    facebook: String,
    twitter: String,
    google: String,
    tokens: Array,
    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String,
        country: String
    },
    fname: String,
    lname: String,
    rating: Number,
    ratingCount: Number,
    // picture: String,
    tagline: String,
    country: String,
    username: String,
    alternateEmail: String,
    phone: String,
    profilePicture: String,
    description: String,
    buyersRequest: [],
    microjobs: [],
    hourly: [],
    portfolio: [],
    spent: Number,
    received: Number,
    withdrawn: Number,
    publicKey: String,
    publicAddress: String,
    profileVerified: Boolean,
    skills: [],
    notifications: [],
    hourlyRate: Number
}, { timestamps: true, usePushEach: true });
/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt_nodejs_1.default.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt_nodejs_1.default.hash(user.password, salt, undefined, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
const comparePassword = function (candidatePassword, cb) {
    bcrypt_nodejs_1.default.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
const isEmailVerified = function (cb) {
    if (this.hasEmailVerified == true) {
        cb(undefined, true);
    }
    else {
        cb("Email is not verified", undefined);
    }
};
userSchema.methods.comparePassword = comparePassword;
userSchema.methods.isEmailVerified = isEmailVerified;
/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size) {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto_1.default
        .createHash("md5")
        .update(this.email)
        .digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};
// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map