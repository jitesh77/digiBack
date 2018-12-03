import { Request, Response, NextFunction } from "express";
import { default as BuyerRequest } from "../models/BuyerRequest";
import { default as Microjob } from "../models/Microjobs";
import { default as Hourly } from "../models/Hourly";
import { default as Portfolio, PortfolioModel } from "../models/Portfolio";
import { default as Rating, RatingModel } from "../models/Rating";
import logger from "../util/logger";
import {
  default as MicrojobOrder,
  MicrojobOrderModel
} from "../models/MicrojobOrder";

import {
  default as RequestOrder,
  RequestOrderModel
} from "../models/BuyerRequestOrderModel";
import {
  default as HourlyOrder,
  HourlyOrderModel
} from "../models/HourlyOrder";
import { default as User, UserModel, AuthToken } from "../models/User";
import { AcceptedMicrojobOrder } from "../models";
import {
  Message,
  MessageModel,
  MessagesList,
  MessagesListModel
} from "../models/Messages";
/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
  res.send({
    result: false,
    message: "This is not what you should be looking at!"
  });
};

/**
 * GET /
 *  Buyers Request
 */

export let getBuyerRequests = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.params.page);
  const limit = parseInt(req.params.limit);
  const skip = limit * (page - 1);

  BuyerRequest.find({ status: 1 }, (err, data) => {
    if (err) {
      return res.send({
        result: false,
        message: err
      });
    } else {
      if (data.length >= 1) {
        return res.send({
          result: true,
          data: data
        });
      } else {
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

export let getSingleBuyerRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  BuyerRequest.findOne({ _id: id }, (err, data) => {
    if (err) {
      return res.send({
        result: false,
        message: err
      });
    } else {
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

export let getHourlies = (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.params.page);
  const limit = parseInt(req.params.limit);
  const skip = limit * (page - 1);
  Hourly.find({ status: 1 }, (err, data) => {
    if (err) {
      return res.send({
        result: false,
        message: err
      });
    } else {
      if (data.length >= 1) {
        return res.send({
          result: true,
          data: data
        });
      } else {
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

export let getMicrojobs = (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.params.page);
  const limit = parseInt(req.params.limit);
  const skip = limit * (page - 1);

  Microjob.find({ status: 1 }, (err, data) => {
    if (err) {
      return res.send({
        result: false,
        message: err
      });
    } else {
      if (data.length >= 1) {
        return res.send({
          result: true,
          data: data
        });
      } else {
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
export let getSingleMicrojob = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  Microjob.findById({ _id: id }, (err, data) => {
    if (err) {
      return res.send({
        result: false,
        message: err
      });
    } else {
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

export let getSingleHourly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  Hourly.findById(id, (err, data) => {
    if (err) {
      return res.send({
        result: false,
        message: err
      });
    } else {
      if (data) {
        return res.send({
          result: true,
          data: data
        });
      }
    }
  });
};

export let getMyMicrojobs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user._id;
  console.log(id);
  Microjob.find({ authorId: id }, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({
        result: false,
        message: err
      });
    } else {
      return res.send({
        result: true,
        data: data
      });
    }
  });
};

export let getMyHourlies = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user._id;
  console.log(id);
  Hourly.find({ authorId: id }, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({
        result: false,
        message: err
      });
    } else {
      return res.send({
        result: true,
        data: data
      });
    }
  });
};

export let getMyBuyerRequests = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user._id;
  BuyerRequest.find({ authorId: id }, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({
        result: false,
        message: err
      });
    } else {
      return res.send({
        result: true,
        data: data
      });
    }
  });
};

export let getMyPortfolio = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  Portfolio.find({ authorId: id }, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({
        result: false,
        message: err
      });
    } else {
      return res.send({
        result: true,
        data: data
      });
    }
  });
};

export let getSinglePortfolio = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  Portfolio.findById(id, (err, data) => {
    if (err) {
      return res.send({
        result: false,
        message: err
      });
    } else {
      if (data) {
        return res.send({
          result: true,
          data: data
        });
      }
    }
  });
};
export let getMyHourlyOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user._id;
  console.log(id);
  HourlyOrder.find({ authorId: id, status: { $gt: 0 } }, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({
        result: false,
        message: err
      });
    } else {
      return res.send({
        result: true,
        data: data
      });
    }
  });
};

export let getMyMicrojobOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user._id;
  console.log(id);
  MicrojobOrder.find({ authorId: id, status: { $gt: 0 } }, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({
        result: false,
        message: err
      });
    } else {
      return res.send({
        result: true,
        data: data
      });
    }
  });
};

export let getMyRequestOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user._id;
  console.log(id);
  RequestOrder.find({ authorId: id, status: { $gt: 0 } }, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({
        result: false,
        message: err
      });
    } else {
      return res.send({
        result: true,
        data: data
      });
    }
  });
};

export let getSentRequestOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user._id;
  console.log(id);
  RequestOrder.find({ senderId: id, status: { $gt: 0 } }, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({
        result: false,
        message: err
      });
    } else {
      return res.send({
        result: true,
        data: data
      });
    }
  });
};

export let getMySentOrders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const type = req.params.type;
  const id = req.user._id;
  console.log(type, id);

  if (type == "hourly") {
    HourlyOrder.find({ senderId: id, status: { $gt: 0 } }, (err, data) => {
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
      } else {
        return res.send({
          result: false,
          message: "No data found"
        });
      }
    });
  }

  if (type == "request") {
    RequestOrder.find({ senderId: id, status: { $gt: 0 } }, (err, data) => {
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
      } else {
        return res.send({
          result: false,
          message: "No data found"
        });
      }
    });
  }

  if (type == "microjob") {
    MicrojobOrder.find({ senderId: id, status: { $gt: 0 } }, (err, data) => {
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
      } else {
        return res.send({
          result: false,
          message: "No data found"
        });
      }
    });
  }
};

export let getMyOrder = (req: Request, res: Response, next: NextFunction) => {
  const type = req.params.type;
  const id = req.params.id;
  console.log(type, id);

  if (type == "hourly") {
    HourlyOrder.findById(id, (err, data) => {
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
      } else {
        return res.send({
          result: false,
          message: "No data found"
        });
      }
    });
  }

  if (type == "request") {
    BuyerRequest.findById(id, (err, data) => {
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
      } else {
        return res.send({
          result: false,
          message: "No data found"
        });
      }
    });
  }

  if (type == "microjob") {
    MicrojobOrder.findById(id, (err, data) => {
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
      } else {
        return res.send({
          result: false,
          message: "No data found"
        });
      }
    });
  }
};

export let deletePost = (req: Request, res: Response, next: NextFunction) => {
  const type = req.body.type;
  const id = req.body.id;

  type.find({ _id: id }, (err: any, data: any) => {
    if (err) {
      return res.send({
        result: false,
        message: "Not able to delete please try later"
      });
    } else {
      data.status = 0;
      type.save((err: any) => {
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

export let getCategoryPost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const type = req.params.type;
  const id = req.params.id;
  if (type == "BuyerRequest") {
    BuyerRequest.find({ "category._id": id }, (err: any, data: any) => {
      if (err) {
        return res.send({
          result: false,
          message: "Not able to find post at this time please try again later"
        });
      } else {
        if (data.length > 0) {
          return res.send({
            result: true,
            data: data
          });
        } else {
          return res.send({
            result: false,
            message: "No more new posts"
          });
        }
      }
    }).sort({ updatedAt: -1 });
  }
  if (type == "Hourly") {
    Hourly.find({ "category._id": id }, (err: any, data: any) => {
      if (err) {
        return res.send({
          result: false,
          message: "Not able to find post at this time please try again later"
        });
      } else {
        if (data.length > 0) {
          return res.send({
            result: true,
            data: data
          });
        } else {
          return res.send({
            result: false,
            message: "No more hourly new posts"
          });
        }
      }
    }).sort({ updatedAt: -1 });
  }
  if (type == "Microjob") {
    Microjob.find({ "category._id": id }, (err: any, data: any) => {
      if (err) {
        return res.send({
          result: false,
          message: "Not able to find post at this time please try again later"
        });
      } else {
        if (data.length > 0) {
          return res.send({
            result: true,
            data: data
          });
        } else {
          return res.send({
            result: false,
            message: "No more new posts"
          });
        }
      }
    }).sort({ updatedAt: -1 });
  }
};

export let getSubCategoryPost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const type = req.params.type;
  const id = req.params.id;
  if (type == "BuyerRequest") {
    BuyerRequest.find({ "subCategory._id": id }, (err: any, data: any) => {
      if (err) {
        return res.send({
          result: false,
          message: "Not able to find post at this time please try again later"
        });
      } else {
        if (data.length > 0) {
          return res.send({
            result: true,
            data: data
          });
        } else {
          return res.send({
            result: false,
            message: "No more new posts"
          });
        }
      }
    }).sort({ updatedAt: -1 });
  }
  if (type == "Hourly") {
    Hourly.find({ "category._id": id }, (err: any, data: any) => {
      if (err) {
        return res.send({
          result: false,
          message: "Not able to find post at this time please try again later"
        });
      } else {
        if (data.length > 0) {
          return res.send({
            result: true,
            data: data
          });
        } else {
          return res.send({
            result: false,
            message: "No more hourly new posts"
          });
        }
      }
    }).sort({ updatedAt: -1 });
  }
  if (type == "Microjob") {
    Microjob.find({ "category._id": id }, (err: any, data: any) => {
      if (err) {
        return res.send({
          result: false,
          message: "Not able to find post at this time please try again later"
        });
      } else {
        if (data.length > 0) {
          return res.send({
            result: true,
            data: data
          });
        } else {
          return res.send({
            result: false,
            message: "No more new posts"
          });
        }
      }
    }).sort({ updatedAt: -1 });
  }
};

export let getReviews = (req: Request, res: Response, next: NextFunction) => {
  const type = req.params.type;
  if (type == "order") {
    Rating.find({ orderId: req.params.id }, (err, data) => {
      if (err) {
        return res.send({
          result: false,
          message: "Error in finding ratings"
        });
      } else {
        return res.send({
          result: true,
          data: data
        });
      }
    });
  }

  if (type == "job") {
    Rating.find({ jobId: req.params.id, clientReview: true }, (err, data) => {
      if (err) {
        return res.send({
          result: false,
          message: "Error in finding ratings"
        });
      } else {
        return res.send({
          result: true,
          data: data
        });
      }
    });
  }

  if (type == "user") {
    Rating.find({ receiverId: req.params.id }, (err, data) => {
      if (err) {
        return res.send({
          result: false,
          message: "Error in finding ratings"
        });
      } else {
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

export let getMessages = (req: Request, res: Response) => {
  const room = req.params.room;
  Message.findOne({ room: room }, (err, data) => {
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

export let getMessageList = (req: Request, res: Response) => {
  MessagesList.find(
    { $or: [{ pOne: req.user._id }, { pTwo: req.user._id }] },
    (err, data) => {
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
    }
  ).sort({ updatedAt: -1 });
};
