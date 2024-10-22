import express from "express";
const app = express();
import {ToDoModel} from "./db.js";
import {userModel} from "./db.js";
import {LogInSchema, SignUpSchema}  from "./schema.js";

app.use(express.json()) //middleware

app.get("/", (req,res) => {
    res.json("hello there")    
})

app.post("/postToDo", async (req,res) => {
    const {title,description,markAsDone} = req.body
    console.log(title);
    console.log(description);
    try {
        await ToDoModel.create({
            title : title,
            description : description,
            markAsDone : markAsDone
        });
        
    } catch (error) {
        console.log("error aagya");
        console.log(error);

    }
    res.send("done successfully")
});

app.post("/Signup",async (req,res) => {
    const {name,email,password} = req.body
    
    const parseResponse = SignUpSchema.safeParse({
        name : name,
        email : email,
        password : password
    });

    if (parseResponse.success == false){
        return res.json({
            message : parseResponse.error
        })
    }

    try {
        const userAlreadyExists = await userModel.findOne({email : email})
        if (userAlreadyExists){
            return res.status(404).json({
                message : "Email already exists!"
            })
        }
    } catch (error) {
        console.log("exists user");
        console.log(error);
        
    }
    
    try {
        await userModel.create({
            name: name,
            email : email,
            password : password
        });
    } catch (error) {
        console.log("bhaiya error aagya!");
        console.log(error);
        
    }
    res.send("created user's db")
})

app.post("/LogIn", async (req,res) => {
    const {email,password} = req.body
    const LoginParse = LogInSchema.safeParse({
        email : email,
        password : password
    })
    console.log(LoginParse);
    
    
    if (LoginParse.success == false){
        return res.status(404).json({
            message: "invalid credentials"
        })
    }

    try {
        const logInUser = await userModel.findOne( {
            email : email,
            password : password
        });
        if (!logInUser){
            return res.json({
                message: "user exists not"
            })
        }
        return res.json({
            message : "you are now logged in"
        })
        
        
    } catch (error) {
        console.log("error has occurred while logging in")
        console.log(error);
    }
    

    
})

app.listen(3000,() => {
    console.log("hogya");
})

