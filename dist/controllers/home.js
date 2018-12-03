"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BuyerRequest_1 = __importDefault(require("../models/BuyerRequest"));
const Microjobs_1 = __importDefault(require("../models/Microjobs"));
const Hourly_1 = __importDefault(require("../models/Hourly"));
const Portfolio_1 = __importDefault(require("../models/Portfolio"));
const Rating_1 = __importDefault(require("../models/Rating"));
const MicrojobOrder_1 = __importDefault(require("../models/MicrojobOrder"));
const BuyerRequestOrderModel_1 = __importDefault(require("../models/BuyerRequestOrderModel"));
const HourlyOrder_1 = __importDefault(require("../models/HourlyOrder"));
const Messages_1 = require("../models/Messages");
/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
    res.send({
        result: false,
        message: "This is not what you should be looking at!"
    });
};
/**
 * GET /
 *  Buyers Request
 */
exports.getBuyerRequests = (req, res, next) => {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    const skip = limit * (page - 1);
    BuyerRequest_1.default.find({ status: 1 }, (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: err
            });
        }
        else {
            if (data.length >= 1) {
                return res.send({
                    result: true,
                    data: data
                });
            }
            else {
                return res.send({
                    result: false,
                    message: "No More Buyer Requests"
                });
            }
        }
    })
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });
};
exports.getSingleBuyerRequest = (req, res, next) => {
    const id = req.params.id;
    BuyerRequest_1.default.findOne({ _id: id }, (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: err
            });
        }
        else {
            if (data) {
                console.log(data);
                return res.send({
                    result: true,
                    data: data
                });
            }
        }
    });
};
exports.getHourlies = (req, res, next) => {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    const skip = limit * (page - 1);
    Hourly_1.default.find({ status: 1 }, (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: err
            });
        }
        else {
            if (data.length >= 1) {
                return res.send({
                    result: true,
                    data: data
                });
            }
            else {
                return res.send({
                    result: false,
                    message: "No More Hourlies"
                });
            }
        }
    })
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });
};
exports.getMicrojobs = (req, res, next) => {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    const skip = limit * (page - 1);
    Microjobs_1.default.find({ status: 1 }, (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: err
            });
        }
        else {
            if (data.length >= 1) {
                return res.send({
                    result: true,
                    data: data
                });
            }
            else {
                return res.send({
                    result: false,
                    message: "No More Microjobs"
                });
            }
        }
    })
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });
};
exports.getSingleMicrojob = (req, res, next) => {
    const id = req.params.id;
    Microjobs_1.default.findById({ _id: id }, (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: err
            });
        }
        else {
            if (data) {
                return res.send({
                    result: true,
                    data: data
                });
            }
        }
    });
    // AcceptedMicrojobOrder.find({ jobId: id, status: { $gt: -1 } });
};
exports.getSingleHourly = (req, res, next) => {
    const id = req.params.id;
    Hourly_1.default.findById(id, (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: err
            });
        }
        else {
            if (data) {
                return res.send({
                    result: true,
                    data: data
                });
            }
        }
    });
};
exports.getMyMicrojobs = (req, res, next) => {
    const id = req.user._id;
    console.log(id);
    Microjobs_1.default.find({ authorId: id }, (err, data) => {
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
                data: data
            });
        }
    });
};
exports.getMyHourlies = (req, res, next) => {
    const id = req.user._id;
    console.log(id);
    Hourly_1.default.find({ authorId: id }, (err, data) => {
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
                data: data
            });
        }
    });
};
exports.getMyBuyerRequests = (req, res, next) => {
    const id = req.user._id;
    BuyerRequest_1.default.find({ authorId: id }, (err, data) => {
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
                data: data
            });
        }
    });
};
exports.getMyPortfolio = (req, res, next) => {
    const id = req.params.id;
    Portfolio_1.default.find({ authorId: id }, (err, data) => {
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
                data: data
            });
        }
    });
};
exports.getSinglePortfolio = (req, res, next) => {
    const id = req.params.id;
    Portfolio_1.default.findById(id, (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: err
            });
        }
        else {
            if (data) {
                return res.send({
                    result: true,
                    data: data
                });
            }
        }
    });
};
exports.getMyHourlyOrder = (req, res, next) => {
    const id = req.user._id;
    console.log(id);
    HourlyOrder_1.default.find({ authorId: id, status: { $gt: 0 } }, (err, data) => {
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
                data: data
            });
        }
    });
};
exports.getMyMicrojobOrder = (req, res, next) => {
    const id = req.user._id;
    console.log(id);
    MicrojobOrder_1.default.find({ authorId: id, status: { $gt: 0 } }, (err, data) => {
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
                data: data
            });
        }
    });
};
exports.getMyRequestOrder = (req, res, next) => {
    const id = req.user._id;
    console.log(id);
    BuyerRequestOrderModel_1.default.find({ authorId: id, status: { $gt: 0 } }, (err, data) => {
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
                data: data
            });
        }
    });
};
exports.getSentRequestOrder = (req, res, next) => {
    const id = req.user._id;
    console.log(id);
    BuyerRequestOrderModel_1.default.find({ senderId: id, status: { $gt: 0 } }, (err, data) => {
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
                data: data
            });
        }
    });
};
exports.getMySentOrders = (req, res, next) => {
    const type = req.params.type;
    const id = req.user._id;
    console.log(type, id);
    if (type == "hourly") {
        HourlyOrder_1.default.find({ senderId: id, status: { $gt: 0 } }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    data: err
                });
            }
            if (data) {
                return res.send({
                    result: true,
                    data: data
                });
            }
            else {
                return res.send({
                    result: false,
                    message: "No data found"
                });
            }
        });
    }
    if (type == "request") {
        BuyerRequestOrderModel_1.default.find({ senderId: id, status: { $gt: 0 } }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    data: err
                });
            }
            if (data) {
                return res.send({
                    result: true,
                    data: data
                });
            }
            else {
                return res.send({
                    result: false,
                    message: "No data found"
                });
            }
        });
    }
    if (type == "microjob") {
        MicrojobOrder_1.default.find({ senderId: id, status: { $gt: 0 } }, (err, data) => {
            console.log(data);
            if (err) {
                return res.send({
                    result: false,
                    data: err
                });
            }
            if (data) {
                return res.send({
                    result: true,
                    data: data
                });
            }
            else {
                return res.send({
                    result: false,
                    message: "No data found"
                });
            }
        });
    }
};
exports.getMyOrder = (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
    console.log(type, id);
    if (type == "hourly") {
        HourlyOrder_1.default.findById(id, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    data: err
                });
            }
            if (data) {
                return res.send({
                    result: true,
                    data: data
                });
            }
            else {
                return res.send({
                    result: false,
                    message: "No data found"
                });
            }
        });
    }
    if (type == "request") {
        BuyerRequest_1.default.findById(id, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    data: err
                });
            }
            if (data) {
                return res.send({
                    result: true,
                    data: data
                });
            }
            else {
                return res.send({
                    result: false,
                    message: "No data found"
                });
            }
        });
    }
    if (type == "microjob") {
        MicrojobOrder_1.default.findById(id, (err, data) => {
            console.log(data);
            if (err) {
                return res.send({
                    result: false,
                    data: err
                });
            }
            if (data) {
                return res.send({
                    result: true,
                    data: data
                });
            }
            else {
                return res.send({
                    result: false,
                    message: "No data found"
                });
            }
        });
    }
};
exports.deletePost = (req, res, next) => {
    const type = req.body.type;
    const id = req.body.id;
    type.find({ _id: id }, (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: "Not able to delete please try later"
            });
        }
        else {
            data.status = 0;
            type.save((err) => {
                if (err) {
                    return res.send({
                        result: false,
                        message: "Error in deleting please try again later"
                    });
                }
            });
            return res.send({
                result: true,
                message: "successfully deleted"
            });
        }
    });
};
exports.getCategoryPost = (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
    if (type == "BuyerRequest") {
        BuyerRequest_1.default.find({ "category._id": id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Not able to find post at this time please try again later"
                });
            }
            else {
                if (data.length > 0) {
                    return res.send({
                        result: true,
                        data: data
                    });
                }
                else {
                    return res.send({
                        result: false,
                        message: "No more new posts"
                    });
                }
            }
        }).sort({ updatedAt: -1 });
    }
    if (type == "Hourly") {
        Hourly_1.default.find({ "category._id": id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Not able to find post at this time please try again later"
                });
            }
            else {
                if (data.length > 0) {
                    return res.send({
                        result: true,
                        data: data
                    });
                }
                else {
                    return res.send({
                        result: false,
                        message: "No more hourly new posts"
                    });
                }
            }
        }).sort({ updatedAt: -1 });
    }
    if (type == "Microjob") {
        Microjobs_1.default.find({ "category._id": id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Not able to find post at this time please try again later"
                });
            }
            else {
                if (data.length > 0) {
                    return res.send({
                        result: true,
                        data: data
                    });
                }
                else {
                    return res.send({
                        result: false,
                        message: "No more new posts"
                    });
                }
            }
        }).sort({ updatedAt: -1 });
    }
};
exports.getSubCategoryPost = (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
    if (type == "BuyerRequest") {
        BuyerRequest_1.default.find({ "subCategory._id": id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Not able to find post at this time please try again later"
                });
            }
            else {
                if (data.length > 0) {
                    return res.send({
                        result: true,
                        data: data
                    });
                }
                else {
                    return res.send({
                        result: false,
                        message: "No more new posts"
                    });
                }
            }
        }).sort({ updatedAt: -1 });
    }
    if (type == "Hourly") {
        Hourly_1.default.find({ "category._id": id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Not able to find post at this time please try again later"
                });
            }
            else {
                if (data.length > 0) {
                    return res.send({
                        result: true,
                        data: data
                    });
                }
                else {
                    return res.send({
                        result: false,
                        message: "No more hourly new posts"
                    });
                }
            }
        }).sort({ updatedAt: -1 });
    }
    if (type == "Microjob") {
        Microjobs_1.default.find({ "category._id": id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Not able to find post at this time please try again later"
                });
            }
            else {
                if (data.length > 0) {
                    return res.send({
                        result: true,
                        data: data
                    });
                }
                else {
                    return res.send({
                        result: false,
                        message: "No more new posts"
                    });
                }
            }
        }).sort({ updatedAt: -1 });
    }
};
exports.getReviews = (req, res, next) => {
    const type = req.params.type;
    if (type == "order") {
        Rating_1.default.find({ orderId: req.params.id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Error in finding ratings"
                });
            }
            else {
                return res.send({
                    result: true,
                    data: data
                });
            }
        });
    }
    if (type == "job") {
        Rating_1.default.find({ jobId: req.params.id, clientReview: true }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Error in finding ratings"
                });
            }
            else {
                return res.send({
                    result: true,
                    data: data
                });
            }
        });
    }
    if (type == "user") {
        Rating_1.default.find({ receiverId: req.params.id }, (err, data) => {
            if (err) {
                return res.send({
                    result: false,
                    message: "Error in finding ratings"
                });
            }
            else {
                return res.send({
                    result: true,
                    data: data
                });
            }
        });
    }
};
/* ============================================================
   ==================== get messages ====================*/
exports.getMessages = (req, res) => {
    const room = req.params.room;
    Messages_1.Message.findOne({ room: room }, (err, data) => {
        if (err) {
            return res.send({
                result: false,
                message: "Error"
            });
        }
        return res.send({
            result: true,
            data: data
        });
    });
};
exports.getMessageList = (req, res) => {
    Messages_1.MessagesList.find({ $or: [{ pOne: req.user._id }, { pTwo: req.user._id }] }, (err, data) => {
        if (err) {
            // console.log(err);
            return res.send({
                result: false,
                message: "Error in finding list"
            });
        }
        console.log(data);
        return res.send({
            result: true,
            data: data
        });
    }).sort({ updatedAt: -1 });
};
//# sourceMappingURL=home.js.map