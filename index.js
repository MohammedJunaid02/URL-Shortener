//imports
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkForAuthentication,restrictTo }  = require("./middlewares/auth");
const { connectToMongodb } = require("./connection");
const URL = require("./models/url");

const app = express();
const PORT = 8000;

//routes
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

//connection to MongoDB
connectToMongodb("mongodb://localhost:27017/url-shortener")
.then(() => console.log("MongoDb connected successfully"));

//middlewares
app.use(express.json()); // this is used to avoid cannot read properties of read null for body
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL","ADMIN"]) , urlRoute); //here the restrictTo acts as a inline middleware
app.use("/", staticRoute);
app.use("/user", userRoute);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.get("/test", async (req, res) => {
//     const allUrls  = await URL.find({});
//     return res.render("home",{
//         urls: allUrls,
//     });
// })

// app.get("/test", async(req,res) => {
//     const allUrls = await URL.find({});
//     return res.end(`
//         <html>
//             <head></head>
//             <body>
//                 <ol>
//                     ${allUrls
//                         .map(url => 
//                             `<li>${url.shortenedURL} - ${url.redirectURL} -${url.visitHistory.length}</li>`).join("")}
//                 </ol>
//             </body>
//         </html>
//     `)
// })

// app.use("/:shortenedURL", urlRoute);

app.get("/:shortenedURL", urlRoute);

app.listen(PORT, () => console.log(`Server connected successfully at PORT : ${PORT}`));