import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";

export type UserModel = mongoose.Document & {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  verificationToken: string;
  hasData: boolean;
  hasEmailVerified: boolean;

  facebook: string;
  tokens: AuthToken[];

  profile: {
    name: string;
    gender: string;
    country: string;
    website: string;
    picture: string;
  };
  fname: string;
  lname: string;
  rating: number;
  ratingCount: number;
  // picture: string;
  tagline: string;
  location: string;
  username: string;
  alternateEmail: string;
  phone: string;
  profilePicture: string;
  description: string;
  buyersRequest: Array<any>;
  microjobs: Array<any>;
  hourly: Array<any>;
  portfolio: Array<any>;
  spent: number;
  received: number;
  withdrawn: number;
  publicKey: string;
  publicAddress: string;
  profileVerified: boolean;
  skills: any;
  notifications: Array<any>;
  hourlyRate: number;
  comparePassword: comparePasswordFunction;
  isEmailVerified: emailVerifiedFunction;
  gravatar: (size: number) => string;
};

type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: any, isMatch: any) => {}
) => void;

type emailVerifiedFunction = (cb: (err: any, isVerified: any) => {}) => void;

export type AuthToken = {
  accessToken: string;
  kind: string;
};

const userSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true, usePushEach: true }
);

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function(
  candidatePassword,
  cb
) {
  bcrypt.compare(
    candidatePassword,
    this.password,
    (err: mongoose.Error, isMatch: boolean) => {
      cb(err, isMatch);
    }
  );
};

const isEmailVerified: emailVerifiedFunction = function(cb) {
  if (this.hasEmailVerified == true) {
    cb(undefined, true);
  } else {
    cb("Email is not verified", undefined);
  }
};

userSchema.methods.comparePassword = comparePassword;
userSchema.methods.isEmailVerified = isEmailVerified;

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function(size: number) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto
    .createHash("md5")
    .update(this.email)
    .digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const User = mongoose.model("User", userSchema);
export default User;
