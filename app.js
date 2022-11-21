const express = require("express");
const ConnectToMongo = require("./db/conn");
const app = express();
const session = require("express-session");

app.use(session({
    secret:"OurlittleSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge:1000 * 60 * 60 * 24 * 1
    }
}));


ConnectToMongo();


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use("/", require("./routers/frusers"));

app.listen(5000, ()=>{
    console.log("Your Server is running on port 5000");
});