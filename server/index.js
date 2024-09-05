import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

const app = express();
dotenv.config();
app.use(bodyParser.json());

// Use CORS middleware with the proper configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

const PORT = process.env.PORT || 8000; 
const URL = process.env.MONGOURL;
 
mongoose.connect(URL, { dbName: "STUDENT_REGISTRATION_CRUD" }).then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}).catch(error => console.log(error));

app.use("/api", route);
