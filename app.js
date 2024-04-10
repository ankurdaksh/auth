import express from 'express';
import connectDB from './config/index.js';
import bcrypt from 'bcrypt'
import { Users } from './models/Users.model.js';
import { createTokens, validateToken } from './JWT/JWT.js';

const app = express();

connectDB();

app.use(express.json());


app.post("/register", (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      })
        .then(() => {
          res.json("USER REGISTERED");
        })
        .catch((err) => {
          if (err) {
            res.status(400).json({ error: err });
          }
        });
    });
  });
  
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.find({ username });
    if (!user) res.status(400).json({ error: "User Doesn't Exist" });
  
    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ error: "Wrong Username and Password Combination!" });
      } else {
        const accessToken = createTokens(user);
        return res.json({ accessToken: accessToken });
      }
    });
  });
  
  app.get("/profile", validateToken, (req, res) => {
    res.json("profile");
  });

app.listen(7878,()=>{
    console.log("port is running")
})