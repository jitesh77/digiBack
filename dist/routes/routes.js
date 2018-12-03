"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homeController = __importStar(require("../controllers/home"));
const userController = __importStar(require("../controllers/user"));
const apiController = __importStar(require("../controllers/api"));
const contactController = __importStar(require("../controllers/contact"));
const formController = __importStar(require("../controllers/form"));
const logger_1 = __importDefault(require("../util/logger"));
const corsMiddleware = (req, res, next) => {
    logger_1.default.debug(req.method + " at " + req.url);
    res.setHeader("Access-Control-Allow-Origin", "http://192.168.1.104:4200");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
};
exports.default = (app, passportConfig) => {
    /**
     * Primary app routes.
     */
    //   app.options("*", (req: Request, res: Response) => {
    //     console.log("/options");
    //     res.setHeader("Access-Control-Allow-Origin", "http://192.168.1.104:4200");
    //     res.setHeader("Access-Control-Allow-Credentials", "true");
    //     res.setHeader(
    //       "Access-Control-Allow-Methods",
    //       "POST, GET, PUT, DELETE, OPTIONS"
    //     );
    //     res.setHeader(
    //       "Access-Control-Allow-Headers",
    //       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    //     );
    //     res.send({ result: true, message: "Want more options?" });
    //   });
    app.all("*", corsMiddleware);
    app.options("*", (req, res) => {
        res.send({ result: true, message: "You just want Attention!" });
    });
    app.get("/api/", homeController.index);
    // app.get("/api/login", userController.getLogin);
    app.post("/api/login", userController.postLogin);
    app.get("/api/logout", userController.logout);
    // app.get("/api/forgot", userController.getForgot);
    app.post("/api/forgot", userController.postForgot);
    // app.get("/api/reset/:token", userController.getReset);
    app.post("/api/reset/:token", userController.postReset);
    // app.get("/api/signup", userController.getSignup);
    app.post("/api/signup", userController.postSignup);
    // app.get("/api/contact", contactController.getContact);
    app.post("/api/contact", contactController.postContact);
    app.get("/api/account", passportConfig.isAuthenticated, userController.getAccount);
    app.post("/api/addDetails", passportConfig.isAuthenticated, userController.postAddDetails);
    app.post("/api/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
    app.post("/api/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
    /* ============================================================
      ==================== get requests ====================*/
    app.get("/api/getAllCategories", apiController.getAllCategories);
    app.get("/api/getAllSubCategories", apiController.getAllSubCategories);
    app.get("/api/category/:id", apiController.getSubCategories);
    app.get("/api/getBuyerRequests/:page/:limit", homeController.getBuyerRequests);
    app.get("/api/getHourlies/:page/:limit", homeController.getHourlies);
    app.get("/api/getMicrojobs/:page/:limit", homeController.getMicrojobs);
    app.get("/api/currentUser", passportConfig.isAuthenticated, userController.currentUser);
    app.get("/api/getSingleBuyerRequest/:id", homeController.getSingleBuyerRequest);
    app.get("/api/getSingleMicrojob/:id", homeController.getSingleMicrojob);
    app.get("/api/getSinglePortfolio/:id", homeController.getSinglePortfolio);
    app.get("/api/getSingleHourly/:id", homeController.getSingleHourly);
    app.get("/api/getUserBox/:id", userController.getUserBox);
    app.get("/api/findUsername/:username", userController.findUername);
    app.get("/api/getSignedUrl/:filename", userController.getSignedUrl);
    app.get("/api/getMyMicrojobs", passportConfig.isAuthenticated, homeController.getMyMicrojobs);
    app.get("/api/getMyHourlies", passportConfig.isAuthenticated, homeController.getMyHourlies);
    app.get("/api/getMyBuyerRequests", passportConfig.isAuthenticated, homeController.getMyBuyerRequests);
    app.get("/api/getMyPortfolio/:id", homeController.getMyPortfolio);
    app.get("/api/getMyHourlyOrder/", passportConfig.isAuthenticated, homeController.getMyHourlyOrder);
    app.get("/api/getMyRequestOrder/", passportConfig.isAuthenticated, homeController.getMyRequestOrder);
    app.get("/api/getSentRequestOrder/", passportConfig.isAuthenticated, homeController.getSentRequestOrder);
    app.get("/api/getMySentOrders/:type", passportConfig.isAuthenticated, homeController.getMySentOrders);
    app.get("/api/getMyMicrojobOrder/", passportConfig.isAuthenticated, homeController.getMyMicrojobOrder);
    app.get("/api/getCategoryPost/:type/:id", homeController.getCategoryPost);
    app.get("/api/getSubCategoryPost/:type/:id", homeController.getSubCategoryPost);
    app.get("/api/getMessageList", passportConfig.isAuthenticated, homeController.getMessageList);
    app.get("/api/getMessages/:room", passportConfig.isAuthenticated, homeController.getMessages);
    app.get("/api/singleOrder/:type/:id", homeController.getMyOrder);
    app.get("/api/verify/:email/:token", userController.verifyUser);
    app.get("/api/getReviews/:type/:id", homeController.getReviews);
    app.get("/api/getSmallUserDetails/:id", userController.getSmallUserDetails);
    /* ============================================================
       ==================== post requests ====================*/
    app.post("/api/category", apiController.postCategory);
    app.post("/api/subCategory", apiController.postSubCategory);
    app.post("/api/postBuyerRequest", formController.postBuyerRequest);
    app.post("/api/postMicrojob", formController.postMicrojob);
    app.post("/api/updateMicrojob", formController.updateMicrojob);
    app.post("/api/updateHourly", formController.updateHourly);
    app.post("/api/updateBuyerRequest", formController.updateBuyerRequest);
    app.post("/api/postHourly", formController.postHourly);
    app.post("/api/postPortfolio", formController.postPortfolio);
    app.post("/api/updatePortfolio", formController.updatePortfolio);
    app.post("/api/postUpdateDetails", passportConfig.isAuthenticated, userController.postUpdateDetails);
    app.post("/api/postMicrojobOrder", passportConfig.isAuthenticated, formController.postMicrojobOrder);
    app.post("/api/postRequestOrder", passportConfig.isAuthenticated, formController.postBuyerRequestOrder);
    app.post("/api/postHourlyOrder", passportConfig.isAuthenticated, formController.postHourlyOrder);
    app.post("/api/deletePost", passportConfig.isAuthenticated, homeController.deletePost);
    app.post("/api/acceptOrder", passportConfig.isAuthenticated, formController.acceptOrder);
    app.post("/api/declineOrder", passportConfig.isAuthenticated, formController.declineOrder);
    app.post("/api/completeOrder", passportConfig.isAuthenticated, formController.completeOrder);
    app.post("/api/disputeOrder", passportConfig.isAuthenticated, formController.disputeOrder);
    app.post("/api/addRating", passportConfig.isAuthenticated, formController.addRating);
    app.post("/api/addMessage", formController.addMessages);
    /* ============================================================
       ==================== wallet requests ====================*/
    app.post("/api/wallet/updatePubAddress", userController.postUpdatePublicAddress);
    app.post("/api/wallet/postSignup", userController.postWalletSignup);
    app.post("/api/wallet/setEscrowTxId", userController.setEscrowTxId);
    app.post("/api/wallet/setPaymentSignature1", userController.setPaymentSignature1);
    app.post("/api/wallet/setPaymentTxId", userController.setPaymentTxId);
    app.get("/api/wallet/getPendingBuyerSignature", userController.getPendingBuyerSignature);
    app.get("/api/wallet/getPendingSellerSignature", userController.getPendingSellerSignature);
    app.get("/api/wallet/getPendingMediatedDeals", userController.getPendingMediatedDeals);
    app.get("/api/wallet/getPendingEscrow", userController.getSendingEscrow); // the user have to pay for these deals
    // app.get("/api/wallet/getReceivingEscrow", userController.getReceivingEscrow);
    // testing
    app.get("/api/test/getTesting", userController.testing);
};
//# sourceMappingURL=routes.js.map