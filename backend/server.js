const express=require("express")
const cors=require("cors")
const jwt=require("jsonwebtoken")
const cookieParser = require("cookie-parser"); // need to parse the cookie check reason below
const session = require('express-session');//for session based auth
const app=express();
app.use(
    cors({
      origin: "http://localhost:5173",// no slash at the end
      credentials: true, // Allow credentials (cookies) to be sent,this is mandatory
    })
)

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}))
app.use(express.json())
app.use(cookieParser());
const port=4000
const userSecretKey="hi"

app.get("/",(req,res)=>{
    console.log("running")
    res.cookie("H","KJNJNKJ")
    res.status(200).json({message:"server is running successfully"})
})


app.post("/login",(req,res)=>{
    const {body}=req
    console.log(body)
    if(body.username=="pranai" && body.password=="pranai"){
        let userToken = jwt.sign({ id: "pranai" }, userSecretKey, { expiresIn: '1d' });
       console.log(userToken)
       res.setHeader("Set-Cookie", `token=${userToken}; HttpOnly; Secure; SameSite=Strict; Path=/`);
       const expirationDate = new Date(0); // Set expiration date to the past
    //    res.setHeader(
    //      "Set-Cookie",
    //      `token=; HttpOnly; Secure; SameSite=Strict; Path=/; Expires=${expirationDate.toUTCString()}`
    //    );

    //second way
      //res.cookie("token",userToken)
      //res.cookie('token', '', { expires: new Date(0) });
        res.status(200).json({message:"Success"})
    }
   
   else
    res.status(404).json({message:"failed"})
})


app.get("/protected",CookieValidate,(req,res)=>{
   
    let username=req.user
    res.status(200).json({message:"Success",username:"pranai"})
})


function CookieValidate(req,res,next){

   console.log(req.cookies.token)//this will only work if we use cookie parser
   
   let token= req.headers.cookie.split("=")[1]//this will work if we dont use cookie parser also
   jwt.verify(token,userSecretKey,(err,data)=>{
    if(data){
        req.user=data.id
        next()
    }
    else{
        console.log(err)
        res.status(403).json({message:"unauthorized"})
    }
   })
}


//just learn about sessionStorage no need of this 
app.get('/setSession', (req, res) => {
    // Set session data
     req.session.username = 'pranai';//Cannot set properties of undefined (setting 'username')
    req.session.isAdmin = true;
    console.log(req.session)
    res.send('Session data set successfully!');
});

// Route for accessing session data
app.get('/getSession', (req, res) => {
    // Access session data
    console.log(req.session)
    const username = req.session.username;
    const isAdmin = req.session.isAdmin;

    res.send(`Username: ${username}, isAdmin: ${isAdmin}`);
});


app.listen(port,()=>console.log(`server is running in http://localhost:${port}`))