import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import authRoutes from "./routes/Auth.js";
import dotenv from 'dotenv';
dotenv.config();


import ProductRoute from "./routes/ProductRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(ProductRoute);
app.use(authRoutes);


app.listen(5000, () => console.log('Server up and running'))