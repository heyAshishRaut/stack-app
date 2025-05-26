import dotenv from 'dotenv';
dotenv.config();

import mongoose, { Schema } from "mongoose";

const mongoURL = process.env.MONGO_URL;

if (!mongoURL) {
    throw new Error("MONGO_URL is not defined in the environment variables.");
}

mongoose.connect(mongoURL)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

const account = new Schema({
    fullname: String,
    username: String,
    email: String,
    password: String
});

const tagdetails = new Schema({
    username: String,
    tagname: String,
    color: String
});

const feedbackdetails = new Schema({
    username: String,
    text: String
});

const linkdetails = new Schema({
    username: String,
    title: String,
    link: String,
    description: String,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tagdetails" }],
    source: String,
    date: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        })
    }
});

export const accountModel = mongoose.model("account", account);
export const linkdetailsModel = mongoose.model("linkdetails", linkdetails);
export const tagdetailsModel = mongoose.model("tagdetails", tagdetails);
export const feedbackdetailsModel = mongoose.model("feedbackdetails", feedbackdetails);