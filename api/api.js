import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import formRoute from './routes/form.js';
import datatableRoute from './routes/datatable.js';
import widgetRoute from './routes/widgets.js'

const app = express();
app.get("/", (req, res) => {
    res.json("success");
})

app.use(express.json()); //To send data to d in json format
app.use(cors()); //
app.use(cookieParser());

// ! This is the route for taking the input of the form data --> form.js in routes folder
app.use("/dashboard", formRoute);

// ! This is the route for getting the datatable --> datatable.js in routes folder
// ! from mysql to the server and the rendering 
// ! it to the frontend.
app.use("/dashboard", datatableRoute);

app.use("/dashboard", widgetRoute);

app.listen(8000, ()=>{
    console.log("Port connected!");
})