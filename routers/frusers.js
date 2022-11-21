const authMiddleware = require("../middleware/authMiddleware");
const Notes = require("../models/NotesSchema");
const UserReg = require("../models/userRegSchema");
const router = require("express").Router();

let sess = null;

router.get('/', authMiddleware, async(req, res)=>{
    let notesData = null; 
    if(sess !== null){
        notesData = await Notes.find().sort({addDate: -1});
        res.render("index.ejs", {email:sess.email, notesData});
    }else {
        res.render("index.ejs", {email:null, notesData});
    }
});

router.get('/register', (req, res)=>{
    sess = null
    res.render("register.ejs", {mess:null});
});

router.post("/register", async (req, res)=>{
    sess=null
    const UserExist = await UserReg.exists({email: req.body.email});
    if (UserExist){
        res.render("register.ejs", {mess: "Email already exists"});
    } else {
        const userData = UserReg({
        email: req.body.email,
        password: req.body.password
    });
    await userData.save();
    res.redirect("/login");
    }
});

router.get("/login", (req, res)=>{
    res.render("login.ejs", {mess:null});
});

router.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    const userData = await UserReg.findOne({email: email});
    if(userData !== null){
        if(userData.password == password){
            req.session.isAuth = true;
            sess = req.session;
            sess.email = email;
            res.redirect("/");
        }else {
            res.render("login.ejs", {mess:"Wrong Credentials"});
        }
    }else {
        res.render("login.ejs", {mess:"Wrong Credentials"});
    }
});

router.get("/logout", (req, res)=>{
    req.session.destroy();
    sess = null;
    res.redirect("/login");
});

router.get("/profile", (req, res)=>{
    res.render("profile.ejs");
});

router.get("/addnote", (req, res)=>{
    if(sess !== null ){
        res.render("addNote.ejs", {email:sess.email});
    } else {
        res.render("addNote.ejs", {email:null});
    }
});

router.post("/addnote", async(req, res)=>{
    const addDate = new Date().toLocaleString();
    const notesData = new Notes({
        title:req.body.title,
        desc: req.body.desc,
        addDate: addDate
    });
    await notesData.save();
    res.redirect('/');
});


router.get("/deletenote/:id", async(req, res)=>{
    await Notes.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

module.exports = router;