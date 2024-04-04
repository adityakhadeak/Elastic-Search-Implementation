import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import elasticClient from "./elasticClient.js";
import searchRouter from "./routes/searchRoutes.js";
import indexRouter from "./routes/indexDataRoute.js";
const app = express();

dotenv.config()

app.use(bodyParser.json());

app.use('/api',searchRouter)
app.use('/api',indexRouter)

const port=4000

// Express routes
app.listen(port,()=>{
    console.log('Server Listening on Port ' +port)
});