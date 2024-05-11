//imports
const express = require("express");
const path = require("path");
const { connectToMongodb } = require("./connection");
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const app = express();
const PORT = 8000;

//connection to MongoDB
connectToMongodb("mongodb://localhost:27017/url-shortener")
.then(() => console.log("MongoDb connected successfully"));

//middleware
app.use(express.json()); // this is used to avoid cannot read properties of read null for body

app.use(express.urlencoded({extended: false}));

app.use("/url", urlRoute);
app.use("/", staticRoute);

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