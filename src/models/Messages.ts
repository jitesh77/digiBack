import mongoose from "mongoose";
export type MessageModel = mongoose.Document & {
  user1: string;
  user2: string;
  pic1: string;
  pic2: string;
  room: string;
  messages: MessageArray[];
};

const messagesSchema = new mongoose.Schema(
  {
    user1: String,
    user2: String,
    pic1: String,
    pic2: String,
    room: String,
    messages: Array
  },
  { timestamps: true }
);

export let Message = mongoose.model("Message", messagesSchema);

export type MessagesListModel = mongoose.Document & {
  pOne: string;
  pOneFname: string;
  pOneImage: string;
  pTwo: string;
  pTwoFname: string;
  pTwoImage: string;
  lastMessage: string;
  room: string;
};

const messagesListSchema = new mongoose.Schema(
  {
    pOne: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pTwo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pOneFname: String,
    pTwoFname: String,
    pOneImage: String,
    pTwoImage: String,
    lastMessage: String,
    room: String
  },
  { timestamps: true }
);

export let MessagesList = mongoose.model("MessageList", messagesListSchema);

export type MessageArray = {
  to: string;
  body: string;
  createdOn: Date;
};

export type ReceiversArray = {
  fname: string;
  image: string;
  id: string;
  lastMessage: string;
  room: string;
  updatedOn: Date;
};
