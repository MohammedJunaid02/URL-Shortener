//imports
const mongoose = require("mongoose");

//schema definition
const urlSchema = new mongoose.Schema(
    {
        shortenedURL :{
            type: String,
            required: true,
            unique: true,
        },
        redirectURL:{
            type: String,
            required: true,
        },
        visitHistory: [{timestamp: {type:Number}}],
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    }, 
    { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;