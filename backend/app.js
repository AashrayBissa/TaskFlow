const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 8080;

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const connectDB = require('./config/dbConfig');
connectDB();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,             
}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req,res) => {
    res.send("TaskFlow");
});

app.use("/", userRoutes);
app.use("/dashboard", taskRoutes);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
