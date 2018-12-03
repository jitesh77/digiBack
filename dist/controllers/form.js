"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BuyerRequest_1 = __importDefault(require("../models/BuyerRequest"));
const SubCategory_1 = __importDefault(require("../models/SubCategory"));
const Category_1 = __importDefault(require("../models/Category"));
const Microjobs_1 = __importDefault(require("../models/Microjobs"));
const Hourly_1 = __importDefault(require("../models/Hourly"));
const Portfolio_1 = __importDefault(require("../models/Portfolio"));
const Rating_1 = __importDefault(require("../models/Rating"));
const MicrojobOrder_1 = __importDefault(require("../models/MicrojobOrder"));
const BuyerRequestOrderModel_1 = __importDefault(require("../models/BuyerRequestOrderModel"));
const HourlyOrder_1 = __importDefault(require("../models/HourlyOrder"));
const AcceptedOrder_1 = require("../models/AcceptedOrder");
const User_1 = __importDefault(require("../models/User"));
const dps = require("../util/decpaylib");
const Messages_1 = require("../models/Messages");
/**
 *  Post Buyers Request
 */
// TODO: change author
exports.postBuyerRequest = (req, res, next) => {
    const title = req.body.title.toLowerCase();
    const buyerRequest = new BuyerRequest_1.default({
        title: title,
        description: req.body.description,
        brDescription: req.body.brDescription,
        budget: req.body.budget,
        duration: req.body.duration,
        category: JSON.parse(req.body.category),
        subCategory: JSON.parse(req.body.subCategory),
        tags: JSON.parse(req.body.tags),
        authorId: req.user._id,
        authorFname: req.user.fname,
        authorUserName: req.user.username,
        authorProfilePicture: req.user.profilePicture,
        status: 1,
        rating: 0
    });
    // console.log(buyerRequest);
    buyerRequest.save((err, savedData) => {
        if (err) {
            return res.send({
                result: false,
                message: err
            });
        }
        else {
            console.log(savedData._id);
            User_1.default.findById(savedData.authorId, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    user.buyersRequest.push(savedData._id);
                    user.save(err => {
                        console.log(err);
                    });
                }
            });
            return res.send({
                result: true,
                message: "buyers request sucessfully posted"
            });
        }
    });
};
exports.updateBuyerRequest = (req, res, next) => {
    console.log(req.body.id);
    const title = req.body.title.toLowerCase();
    const request = {};
    request.title = title;
    request.description = req.body.description;
    request.brDescription = req.body.brDescription;
    request.budget = req.body.budget;
    request.duration = req.body.duration;
    request.tags = JSON.parse(req.body.tags);
    request.authorId = req.user._id;
    request.authorFname = req.user.fname;
    request.authorUserName = req.user.username;
    request.authorProfilePicture = req.user.profilePicture;
    request.category = JSON.parse(req.body.category);
    request.subCategory = JSON.parse(req.body.subCategory);
    request.status = 1;
    BuyerRequest_1.default.findOneAndUpdate({ _id: req.body.id }, request, (err, data) => {
        console.log(data);
        if (err) {
            return res.send({
                result: false,
                data: err
            });
        }
        else {
            return res.send({
                result: true,
                message: "Successfully updated"
            });
        }
    });
};
/**
 *  Post Microjob
 */
exports.postMicrojob = (req, res, next) => {
    // console.log(req.body);
    // console.log("called");
    const title = req.body.title.toLowerCase();
    const microjob = new Microjobs_1.default({
        title: title,
        description: req.body.description,
        brDescription: req.body.brDescription,
        price: req.body.price,
        duration: req.body.duration,
        tags: JSON.parse(req.body.tags),
        authorId: req.user._id,
        authorFname: req.user.fname,
        authorUserName: req.user.username,
        authorProfilePicture: req.user.profilePicture,
        file: req.body.file,
        category: JSON.parse(req.body.category),
        subCategory: JSON.parse(req.body.subCategory),
        status: 1,
        rating: 0,
        purchases: 0,
        queue: 0,
        ratingCount: 0
    });
    console.log(microjob);
    microjob.save((err, savedData) => {
        if (err) {
            console.log(err);
            return res.send({
                result: false,
                message: err
            });
        }
        else {
            // console.log(savedData._id);
            User_1.default.findById(savedData.authorId, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    user.microjobs.push(savedData._id);
                    user.save(err => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
            return res.send({
                result: true,
                message: "microjob sucessfully posted"
            });
        }
    });
};
exports.updateMicrojob = (req, res, next) => {
    console.log(req.body.id);
    const title = req.body.title.toLowerCase();
    const microjob = {};
    microjob.title = title;
    microjob.description = req.body.description;
    microjob.brDescription = req.body.brDescription;
    microjob.price = req.body.price;
    microjob.duration = req.body.duration;
    microjob.tags = JSON.parse(req.body.tags);
    microjob.authorId = req.user._id;
    microjob.authorFname = req.user.fname;
    microjob.authorUserName = req.user.username;
    microjob.authorProfilePicture = req.user.profilePicture;
    microjob.file = req.body.file;
    microjob.category = JSON.parse(req.body.category);
    microjob.subCategory = JSON.parse(req.body.subCategory);
    microjob.status = 1;
    Microjobs_1.default.findOneAndUpdate({ _id: req.body.id }, microjob, (err, data) => {
        console.log(data);
        if (err) {
            return res.send({
                result: false,
                data: err
            });
        }
        else {
            return res.send({
                result: true,
                message: "Successfully updated"
            });
        }
    });
};
exports.postHourly = (req, res, next) => {
    const title = req.body.title.toLowerCase();
    const hourly = new Hourly_1.default({
        title: title,
        description: req.body.description,
        rate: req.body.rate,
        duration: req.body.duration,
        brDescription: req.body.brDescription,
        tags: JSON.parse(req.body.tags),
        authorId: req.user._id,
        authorFname: req.user.fname,
        authorUserName: req.user.username,
        authorProfilePicture: req.user.profilePicture,
        file: req.body.file,
        category: JSON.parse(req.body.category),
        subCategory: JSON.parse(req.body.subCategory),
        status: 1,
        rating: 0,
        purchases: 0,
        queue: 0,
        ratingCount: 0
    });
    hourly.save((err, savedData) => {
        if (err) {
            return res.send({
                result: false,
                message: err
            });
        }
        else {
            User_1.default.findById(savedData.authorId, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    user.hourly.push(savedData._id);
                    user.save(err => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
            return res.send({
                result: true,
                message: "hourly sucessfully posted"
            });
        }
    });
};
exports.updateHourly = (req, res, next) => {
    console.log(req.body.id);
    const title = req.body.title.toLowerCase();
    const hourly = {};
    hourly.title = title;
    hourly.description = req.body.description;
    hourly.brDescription = req.body.brDescription;
    hourly.rate = req.body.rate;
    hourly.duration = req.body.duration;
    hourly.tags = JSON.parse(req.body.tags);
    hourly.authorId = req.user._id;
    hourly.authorFname = req.user.fname;
    hourly.authorUserName = req.user.username;
    hourly.authorProfilePicture = req.user.profilePicture;
    hourly.file = req.body.file;
    hourly.category = JSON.parse(req.body.category);
    hourly.subCategory = JSON.parse(req.body.subCategory);
    hourly.status = 1;
    Hourly_1.default.findOneAndUpdate({ _id: req.body.id }, hourly, (err, data) => {
        console.log(data);
        if (err) {
            return res.send({
                result: false,
                data: err
            });
        }
        else {
            return res.send({
                result: true,
                message: "Successfully updated"
            });
        }
    });
};
exports.postPortfolio = (req, res, next) => {
    const title = req.body.title.toLowerCase();
    const portfolio = new Portfolio_1.default({
        title: title,
        description: req.body.description,
        brDescription: req.body.brDescription,
        date: req.body.date,
        tags: JSON.parse(req.body.tags),
        authorId: req.user._id,
        authorFname: req.user.fname,
        authorUserName: req.user.username,
        file: req.body.file,
        category: JSON.parse(req.body.category),
        subCategory: JSON.parse(req.body.subCategory),
        links: req.body.links,
        status: 1
    });
    portfolio.save((err, savedData) => {
        if (err) {
            return res.send({
                result: false,
                message: err
            });
        }
        else {
            User_1.default.findById(savedData.authorId, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    user.portfolio.push(savedData._id);
                    user.save(err => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
            return res.send({
                result: true,
                message: "Portfolio sucessfully saved"
            });
        }
    });
};
exports.updatePortfolio = (req, res, next) => {
    console.log(req.body.id);
    const title = req.body.title.toLowerCase();
    const portfolio = {};
    portfolio.title = title;
    portfolio.description = req.body.description;
    portfolio.brDescription = req.body.brDescription;
    portfolio.date = req.body.date;
    portfolio.tags = JSON.parse(req.body.tags);
    portfolio.links = req.body.links;
    portfolio.authorId = req.user._id;
    portfolio.authorFname = req.user.fname;
    portfolio.authorUserName = req.user.username;
    portfolio.file = req.body.file;
    portfolio.category = JSON.parse(req.body.category);
    portfolio.subCategory = JSON.parse(req.body.subCategory);
    portfolio.status = 1;
    Portfolio_1.default.findOneAndUpdate({ _id: req.body.id }, portfolio, (err, data) => {
        console.log(data);
        if (err) {
            return res.send({
                result: false,
                data: err
            });
        }
        else {
            return res.send({
                result: true,
                message: "Successfully updated"
            });
        }
    });
};
const getTagIds = (name) => {
    return new Promise((resolve, reject) => {
        const tagIdData = [];
        console.log(name);
        SubCategory_1.default.find({ name: name }, (err, data) => {
            if (err) {
                // console.log(err);
                reject(err);
            }
            else {
                if (data) {
                    data.map(d => {
                        tagIdData.push(d);
                    });
                    // console.log(tagIdData);
                    resolve(tagIdData);
                }
            }
        });
    });
};
const getCategories = (name) => {
    return new Promise((resolve, reject) => {
        Category_1.default.findOne({ name: name }, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                if (data) {
                    resolve(data);
                }
            }
        });
    });
};
/* ===============================================================
   ==================== post a microjob order ====================*/
exports.postMicrojobOrder = (req, res, next) => {
    const title = req.body.title.toLowerCase();
    const microjobOrder = new MicrojobOrder_1.default({
        title: title,
        description: req.body.description,
        duration: req.body.duration,
        senderId: req.user._id,
        senderFname: req.user.fname,
        senderUserName: req.user.username,
        jobId: req.body.jobId,
        authorId: req.body.authorId,
        authorFname: req.body.authorFname,
        authorUserName: req.body.authorUserName,
        jobTitle: req.body.microjobTitle,
        status: 1
    });
    microjobOrder.save(err => {
        if (err) {
            console.log(err);
            return res.send({
                result: false,
                message: err
            });
        }
        else {
            return res.send({
                result: true,
                message: "MicrojobOrder sucessfully posted"
            });
        }
    });
};
/* ===============================================================
   ==================== post a request order ====================*/
exports.postBuyerRequestOrder = (req, res, next) => {
    const title = req.body.title.toLowerCase();
    const requestOrder = new BuyerRequestOrderModel_1.default({
        title: title,
        description: req.body.description,
        duration: req.body.duration,
        senderId: req.user._id,
        senderFname: req.user.fname,
        senderUserName: req.user.username,
        jobId: req.body.jobId,
        authorId: req.body.authorId,
        authorFname: req.body.authorFname,
        authorUserName: req.body.authorUserName,
        jobTitle: req.body.requestTitle,
        status: 1
    });
    requestOrder.save(err => {
        if (err) {
            console.log(err);
            return res.send({
                result: false,
                message: err
            });
        }
        else {
            return res.send({
                result: true,
                message: "RequestOrder sucessfully posted"
            });
        }
    });
};
exports.postHourlyOrder = (req, res, next) => {
    const title = req.body.title.toLowerCase();
    const hourlyOrder = new HourlyOrder_1.default({
        title: title,
        description: req.body.description,
        duration: req.body.duration,
        senderId: req.user._id,
        senderFname: req.user.fname,
        senderUserName: req.user.username,
        jobId: req.body.jobId,
        authorId: req.body.authorId,
        authorFname: req.body.authorFname,
        authorUserName: req.body.authorUserName,
        jobTitle: req.body.hourlyTitle,
        status: 1
    });
    hourlyOrder.save(err => {
        if (err) {
            console.log(err);
            return res.send({
                result: false,
                message: err
            });
        }
        else {
            return res.send({
                result: true,
                message: "HourlyOrder sucessfully posted"
            });
        }
    });
};
// const createRedeemscript = () => {
//   return new Promise((resolve, reject) => {
//     dps.createMultisig(2, (res: any, err: any) => {
//       if (err == undefined) {
//         resolve(res);
//       } else {
//         reject(err);
//       }
//     });
//   });
// };
exports.acceptOrder = (req, res, next) => {
    const type = req.body.type;
    const id = req.body.id;
    dps.createMultisig(2, (response, err) => {
        console.log(response);
        if (err == undefined) {
            const redeemScript = response.redeemScript;
            const address = response.address;
            // console.log(type, id);
            if (type == "hourly") {
                HourlyOrder_1.default.findOne({ _id: id }, (err, data) => {
                    if (err) {
                        return res.send({
                            result: false,
                            data: err
                        });
                    }
                    else {
                        data.status = 2;
                        data.save(err => {
                            if (err) {
                                return res.send({
                                    result: false,
                                    message: "Error in accepting order"
                                });
                            }
                        });
                        const acceptedOrder = new AcceptedOrder_1.AcceptedHourlyOrder({
                            title: data.title,
                            description: data.description,
                            duration: req.body.duration,
                            senderId: data.senderId,
                            senderFname: data.senderFname,
                            senderUserName: data.senderUserName,
                            jobId: data.jobId,
                            orderId: data._id,
                            authorId: data.authorId,
                            authorUserName: data.authorUserName,
                            jobTitle: data.jobTitle,
                            RedeemScript: redeemScript,
                            address: address,
                            status: 2
                        });
                        acceptedOrder.save(err => {
                            if (err) {
                                return res.send({
                                    result: false,
                                    message: "Error in accepting order"
                                });
                            }
                            else {
                                res.send({
                                    result: true,
                                    message: "Successfully accepted"
                                });
                            }
                        });
                        Hourly_1.default.findOneAndUpdate({ _id: data.jobId }, {
                            $inc: { queue: 1 }
                        }, (err, data) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                });
            }
            if (type == "microjob") {
                console.log("microjob");
                MicrojobOrder_1.default.findOne({ _id: id }, (err, data) => {
                    if (err) {
                        return res.send({
                            result: false,
                            data: err
                        });
                    }
                    else {
                        data.status = 2;
                        data.save(err => {
                            if (err) {
                                return res.send({
                                    result: false,
                                    message: "Error in accepting order"
                                });
                            }
                        });
                        const acceptedOrder = new AcceptedOrder_1.AcceptedMicrojobOrder({
                            title: data.title,
                            description: data.description,
                            duration: data.duration,
                            senderId: data.senderId,
                            senderFname: data.senderFname,
                            senderUserName: data.senderUserName,
                            jobId: data.jobId,
                            orderId: data._id,
                            authorId: data.authorId,
                            authorUserName: data.authorUserName,
                            jobTitle: data.jobTitle,
                            RedeemScript: redeemScript,
                            address: address,
                            status: 2
                        });
                        acceptedOrder.save(err => {
                            if (err) {
                                return res.send({
                                    result: false,
                                    message: "Error in accepting order"
                                });
                            }
                            else {
                                res.send({
                                    result: true,
                                    message: "Successfully accepted"
                                });
                            }
                        });
                        Microjobs_1.default.findOneAndUpdate({ _id: data.jobId }, {
                            $inc: { queue: 1 }
                        }, (err, data) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                });
            }
            if (type == "buyerRequest") {
                BuyerRequestOrderModel_1.default.findOne({ _id: id }, (err, data) => {
                    if (err) {
                        return res.send({
                            result: false,
                            data: err
                        });
                    }
                    else {
                        data.status = 2;
                        data.save(err => {
                            if (err) {
                                return res.send({
                                    result: false,
                                    message: "Error in accepting order"
                                });
                            }
                        });
                        const acceptedOrder = new AcceptedOrder_1.AcceptedRequestOrder({
                            title: data.title,
                            description: data.description,
                            duration: req.body.duration,
                            senderId: data.senderId,
                            senderFname: data.senderFname,
                            senderUserName: data.senderUserName,
                            jobId: data.jobId,
                            orderId: data._id,
                            authorId: data.authorId,
                            authorUserName: data.authorUserName,
                            jobTitle: data.jobTitle,
                            RedeemScript: redeemScript,
                            address: address,
                            status: 2
                        });
                        acceptedOrder.save(err => {
                            if (err) {
                                return res.send({
                                    result: false,
                                    message: "Error in accepting order"
                                });
                            }
                            else {
                                res.send({
                                    result: true,
                                    message: "Successfully accepted"
                                });
                            }
                        });
                        BuyerRequest_1.default.findOneAndUpdate({ _id: data.jobId }, {
                            $inc: { queue: 1 }
                        });
                    }
                });
            }
        }
        else {
            console.log(err);
        }
    });
};
exports.declineOrder = (req, res, next) => {
    const type = req.body.type;
    const id = req.body.id;
    if (type == "hourly") {
        HourlyOrder_1.default.findOne({ _id: id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    data: err
                });
            }
            else {
                data.status = 0;
                data.save(err => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Error in declining order"
                        });
                    }
                });
            }
        });
    }
    if (type == "microjob") {
        MicrojobOrder_1.default.findOne({ _id: id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    data: err
                });
            }
            else {
                data.status = 0;
                data.save(err => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Error in declining order"
                        });
                    }
                });
            }
        });
    }
    if (type == "buyerRequest") {
        BuyerRequestOrderModel_1.default.findOne({ _id: id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    data: err
                });
            }
            else {
                data.status = 0;
                data.save(err => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Error in declining order"
                        });
                    }
                });
            }
        });
    }
};
//  FIXME: change to find one and update
exports.completeOrder = (req, res, next) => {
    const type = req.body.type;
    const id = req.body.id;
    const by = req.body.by;
    console.log(by);
    if (type == "hourly") {
        HourlyOrder_1.default.findOne({ _id: id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Error in finding order"
                });
            }
            else {
                if (by == "sender") {
                    data.completedSender = true;
                }
                else {
                    data.completedAuthor = true;
                }
                data.status = 3;
                data.save(err => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Error in completing order"
                        });
                    }
                });
            }
        });
        AcceptedOrder_1.AcceptedHourlyOrder.findOne({ orderId: id }, (err, acceptedHourly) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Error in finding order"
                });
            }
            if (acceptedHourly) {
                if (by == "sender") {
                    acceptedHourly.completedSender = true;
                }
                else {
                    acceptedHourly.completedAuthor = true;
                }
                if (acceptedHourly.completedAuthor == true &&
                    acceptedHourly.completedSender == true) {
                    Hourly_1.default.findOneAndUpdate({ _id: acceptedHourly.jobId }, {
                        $inc: { purchases: 1, queue: -1 }
                    }, (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                acceptedHourly.status = 3;
                acceptedHourly.save(err => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Error in completing order"
                        });
                    }
                });
            }
        });
    }
    if (type == "microjob") {
        MicrojobOrder_1.default.findOne({ _id: id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    data: err
                });
            }
            else {
                if (by == "sender") {
                    data.completedSender = true;
                }
                else {
                    data.completedAuthor = true;
                }
                data.status = 3;
                data.save(err => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Error in completing order"
                        });
                    }
                });
            }
        });
        AcceptedOrder_1.AcceptedMicrojobOrder.findOne({ orderId: id }, (err, acceptedMicrojob) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Error in finding order"
                });
            }
            if (acceptedMicrojob) {
                if (by == "sender") {
                    acceptedMicrojob.completedSender = true;
                }
                else {
                    acceptedMicrojob.completedAuthor = true;
                }
                acceptedMicrojob.status = 3;
                if (acceptedMicrojob.completedAuthor == true &&
                    acceptedMicrojob.completedSender == true) {
                    Microjobs_1.default.findOneAndUpdate({ _id: acceptedMicrojob.jobId }, {
                        $inc: { purchases: 1, queue: -1 }
                    }, (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                acceptedMicrojob.save(err => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Error in completing order"
                        });
                    }
                });
            }
        });
    }
    if (type == "buyerRequest") {
        BuyerRequestOrderModel_1.default.findOne({ _id: id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    data: err
                });
            }
            else {
                if (by == "sender") {
                    data.completedSender = true;
                }
                else {
                    data.completedAuthor = true;
                }
                data.status = 3;
                data.save(err => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Error in completing order"
                        });
                    }
                });
            }
        });
        AcceptedOrder_1.AcceptedRequestOrder.findOne({ orderId: id }, (err, acceptedRequest) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Error in finding order"
                });
            }
            if (acceptedRequest) {
                if (by == "sender") {
                    acceptedRequest.completedSender = true;
                }
                else {
                    acceptedRequest.completedAuthor = true;
                }
                acceptedRequest.status = 3;
                if (acceptedRequest.completedAuthor == true &&
                    acceptedRequest.completedSender == true) {
                    BuyerRequest_1.default.findOneAndUpdate({ _id: acceptedRequest.jobId }, {
                        $inc: { purchases: 1, queue: -1 }
                    });
                }
                acceptedRequest.save(err => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Error in completing order"
                        });
                    }
                });
            }
        });
    }
};
exports.disputeOrder = (req, res, next) => {
    const type = req.body.type;
    const id = req.body.id;
    const by = req.body.by;
    console.log(by);
    if (type == "hourly") {
        HourlyOrder_1.default.findOne({ _id: id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Error in finding order"
                });
            }
            else {
                if (by == "sender") {
                    data.disputedSender = true;
                }
                else {
                    data.disputedAuthor = true;
                }
                data.status = -1;
                data.save(err => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Error in disputing order"
                        });
                    }
                });
            }
        });
        AcceptedOrder_1.AcceptedHourlyOrder.findOne({ orderId: id }, (err, acceptedHourly) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Error in finding order"
                });
            }
            if (acceptedHourly) {
                if (by == "sender") {
                    acceptedHourly.disputedSender = true;
                }
                else {
                    acceptedHourly.disputedAuthor = true;
                }
                acceptedHourly.status = -1;
                acceptedHourly.save(err => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Error in disputing order"
                        });
                    }
                });
            }
        });
    }
    if (type == "microjob") {
        MicrojobOrder_1.default.findOne({ _id: id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    data: "Error in finding order"
                });
            }
            else {
                if (by == "sender") {
                    data.disputedSender = true;
                }
                else {
                    data.disputedAuthor = true;
                }
                data.status = -1;
                data.save(err => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Error in disputing order"
                        });
                    }
                });
            }
        });
        AcceptedOrder_1.AcceptedMicrojobOrder.findOne({ orderId: id }, (err, acceptedMicrojob) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Error in finding order"
                });
            }
            if (acceptedMicrojob) {
                if (by == "sender") {
                    acceptedMicrojob.disputedSender = true;
                }
                else {
                    acceptedMicrojob.disputedAuthor = true;
                }
                acceptedMicrojob.status = -1;
                acceptedMicrojob.save(err => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Error in disputing order"
                        });
                    }
                });
            }
        });
    }
    if (type == "buyerRequest") {
        BuyerRequestOrderModel_1.default.findOne({ _id: id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    data: "Error in finding order"
                });
            }
            else {
                if (by == "sender") {
                    data.disputedSender = true;
                }
                else {
                    data.disputedAuthor = true;
                }
                data.status = -1;
                data.save(err => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Error in disputing order"
                        });
                    }
                });
            }
        });
        AcceptedOrder_1.AcceptedRequestOrder.findOne({ orderId: id }, (err, acceptedRequest) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Error in finding order"
                });
            }
            if (acceptedRequest) {
                if (by == "sender") {
                    acceptedRequest.disputedSender = true;
                }
                else {
                    acceptedRequest.disputedAuthor = true;
                }
                acceptedRequest.status = -1;
                acceptedRequest.save(err => {
                    if (err) {
                        return res.send({
                            result: false,
                            message: "Error in disputing order"
                        });
                    }
                });
            }
        });
    }
};
exports.addRating = (req, res, next) => {
    let clientReviewBool = false;
    if (req.body.jobAuthorId == req.body.receiverId) {
        clientReviewBool = true;
    }
    const rating = new Rating_1.default({
        rating: req.body.rating,
        type: req.body.type,
        receiverId: req.body.receiverId,
        receiverFname: req.body.receiverFname,
        senderId: req.user._id,
        senderFname: req.user.fname,
        review: req.body.review,
        orderId: req.body.orderId,
        jobId: req.body.jobId,
        jobAuthorId: req.body.jobAuthorId,
        clientReview: clientReviewBool
    });
    rating.save(err => {
        if (err) {
            return res.send({
                result: false,
                message: "Error in adding rating"
            });
        }
        else {
            return res.send({
                result: true,
                message: "Ratings Added"
            });
        }
    });
    User_1.default.findById(req.body.receiverId, (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: "Error in adding rating to user"
            });
        }
        // data.ratingCount++;
        data.rating =
            (data.rating * data.ratingCount + req.body.rating) /
                (data.ratingCount + 1);
        data.save(err => {
            if (err) {
                console.log(err);
            }
        });
    });
};
/* ============================================================
   ==================== add messages ====================*/
exports.addMessages = (req, res) => {
    const isoDate = new Date().toISOString();
    console.log(req.body);
    // console.log(req.body);
    Messages_1.Message.findOneAndUpdate({ room: req.body.room }, { $push: { messages: JSON.parse(req.body.message), createdOn: isoDate } }, (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: err
            });
        }
        if (data) {
            console.log("true ================================");
            // res.send({
            //   result: true,
            //   message: "Data found"
            // });
        }
        else {
            console.log("else =======================");
            const message = new Messages_1.Message({
                room: req.body.room,
                messages: JSON.parse(req.body.message),
                createdOn: isoDate
            });
            message.save(err => {
                if (err) {
                    return res.send({
                        result: false,
                        message: "Error in adding message"
                    });
                }
            });
        }
    });
    // MessageList.findOne()
    Messages_1.MessagesList.findOneAndUpdate({ room: req.body.room }, {
        $set: {
            lastMessage: JSON.parse(req.body.message).body
        }
    }, (err, data1) => {
        if (err) {
            return res.send({
                result: false,
                message: err
            });
        }
        if (data1) {
            return res.send({
                result: true,
                message: "Success"
            });
        }
        else {
            console.log("else");
            const receiverData = new Messages_1.MessagesList({
                pOne: req.user._id,
                pTwoFname: req.body.receiverFname,
                pTwoImage: req.body.image,
                pTwo: req.body.receiverId,
                pOneFname: req.user.fname,
                pOneImage: req.user.profilePicture,
                lastMessage: JSON.parse(req.body.message).body,
                room: req.body.room
            });
            receiverData.save(err => {
                if (err) {
                    return res.send({
                        result: false,
                        message: err
                    });
                }
                return res.send({
                    result: true,
                    message: "Success"
                });
            });
            // MessagesList.findOneAndUpdate(
            //   { user: req.user._id },
            //   { $push: receiverData },
            //   (err, data2) => {
            //     if (err) {
            //       res.send({
            //         result: false,
            //         message: err
            //       });
            //     }
            //     if (data2) {
            //       res.send({
            //         result: true,
            //         message: "sucess 2"
            //       });
            //     } else {
            //       const userList = new MessagesList({
            //         user: req.user._id,
            //         receivers: [receiverData]
            //       });
            //       userList.save(err => {
            //         if (err) {
            //           res.send({
            //             result: false,
            //             message: "err"
            //           });
            //         }
            //       });
            //     }
            //   }
            // );
        }
    });
};
//# sourceMappingURL=form.js.map