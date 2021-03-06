"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../models/Category"));
const SubCategory_1 = __importDefault(require("../models/SubCategory"));
// import AWS = require("aws-sdk");
// import passport from "passport";
// import { IVerifyOptions } from "passport-local";
// const request = require("express-validator");
// const s3 = new AWS.S3({
//   accessKeyId: "AKIAJB2HNIBACPTH7RZQ",
//   secretAccessKey: "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",
//   region: "us-east-2"
// });
/**
 * Post a category
 */
exports.postCategory = (req, res, next) => {
    if (!req.body.name) {
        return res.send({
            result: false,
            message: "Plz enter the name of the category"
        });
    }
    const name = req.body.name.toLowerCase();
    const category = new Category_1.default({
        name: name,
        description: req.body.description
    });
    Category_1.default.findOne({ name: name }, (err, existingCategory) => {
        if (err) {
            return res.send({
                result: false,
                message: "You encountered an error while adding categories"
            });
        }
        else {
            // checking if category exists
            if (existingCategory) {
                return res.send({
                    result: false,
                    message: "This category already exists in DB"
                });
            }
            else {
                // save category
                category.save(err => {
                    return res.send({
                        result: true,
                        message: "Category successfully added"
                    });
                });
            }
        }
    });
    // next();
};
/**
 * Post a subCategory
 * name
 * category - name
 */
exports.postSubCategory = (req, res, next) => {
    if (!req.body.name) {
        return res.send({
            result: false,
            message: "Plz enter the name of the category"
        });
    }
    const name = req.body.name.toLowerCase();
    const mainCategory = req.body.category.toLowerCase();
    SubCategory_1.default.findOne({ name: name }, (err, existingSubCategory) => {
        if (err) {
            return res.send({
                result: false,
                message: "You encountered an error while searching for subcategory"
            });
        }
        else {
            if (existingSubCategory) {
                return res.send({
                    result: false,
                    message: "This category already exists in DB"
                });
            }
            else {
                Category_1.default.findOne({ name: mainCategory }, (err, existingCategory) => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "You encountered an error while searching for main categories"
                        });
                    }
                    else {
                        if (existingCategory) {
                            const subCategory = new SubCategory_1.default({
                                name: name,
                                category: existingCategory._id
                            });
                            // save category
                            subCategory.save(err => {
                                return res.send({
                                    result: true,
                                    message: "SubCategory successfully added"
                                });
                            });
                        }
                        else {
                            return res.send({
                                result: false,
                                message: "Main category is not present in db"
                            });
                        }
                    }
                });
            }
        }
    });
};
/**
 * GET all categories
 */
exports.getAllCategories = (req, res, next) => {
    // const date = Date.now();
    // console.log(req.user);
    Category_1.default.find({}, (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: "Error in getting Categories"
            });
        }
        else {
            if (data.length) {
                return res.send({ result: true, data: data });
            }
            else {
                return res.send({ result: false, message: "No categories" });
            }
        }
    });
};
/**
 * GET all sub-categories of a  categories
 * params
 * category - name
 */
// export let getSubCategories = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const name = req.params.name.toLowerCase();
//   Category.findOne({ name: name }, (err, existingCategory) => {
//     if (err) {
//       return res.send({
//         result: false,
//         message: "This category in not present in DB"
//       });
//     } else {
//       if (existingCategory) {
//         const categoryId = existingCategory._id;
//         SubCategory.find({ category: categoryId }, (err, data) => {
//           if (err) {
//             return res.send({
//               result: false,
//               message: "Error in getting SubCategories"
//             });
//           } else {
//             if (data.length) {
//               return res.send({ result: true, data: data });
//             } else {
//               return res.send({
//                 result: false,
//                 message: "no subcategories are present for this category"
//               });
//             }
//           }
//         });
//       }
//     }
//   });
// };
exports.getSubCategories = (req, res, next) => {
    const categoryId = req.params.id;
    SubCategory_1.default.find({ category: categoryId }, (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: "Error in getting SubCategories"
            });
        }
        else {
            if (data.length) {
                return res.send({ result: true, data: data });
            }
            else {
                return res.send({
                    result: false,
                    message: "no subcategories are present for this category"
                });
            }
        }
    });
};
/**
 * GET all subategories
 */
exports.getAllSubCategories = (req, res, next) => {
    SubCategory_1.default.find({}, (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: "Error in getting SubCategories"
            });
        }
        else {
            if (data.length) {
                return res.send({ result: true, data: data });
            }
            else {
                return res.send({
                    result: false,
                    message: "No subcategories exist"
                });
            }
        }
    });
};
// export let getSignedUrl = (req: Request, res: Response, next: NextFunction) => {
//   console.log("hello");
//   console.log(req.user);
//   const signedUrlExpireSeconds = 60 * 60;
//   const myBucket = "digiimgbucket";
//   const myKey = "uploads/" + req.user.username + "/" + req.params.filename;
//   const params = {
//     Bucket: myBucket,
//     Key: myKey,
//     Expires: signedUrlExpireSeconds,
//     ACL: "public-read",
//     ContentType: "image/jpg"
//   };
//   s3.getSignedUrl("putObject", params, function(err, url) {
//     if (err) {
//       // console.log("Error getting presigned url from AWS S3");
//       return res.send({ result: false, message: "Pre-Signed URL error" });
//     } else {
//       let fileurls = {};
//       fileurls = url;
//       // console.log("Presigned URL: ", fileurls[0]);
//       return res.send({
//         result: true,
//         data: fileurls,
//         key: myKey
//       });
//     }
//   });
// };
//# sourceMappingURL=api.js.map