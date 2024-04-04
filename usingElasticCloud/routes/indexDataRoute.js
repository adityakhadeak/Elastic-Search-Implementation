import express from "express";
import { indexData } from "../controller/indexDataController.js";

const indexRouter =express()

indexRouter.post('/indexdata',indexData)

export default indexRouter