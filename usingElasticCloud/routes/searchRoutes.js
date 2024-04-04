import express from "express";
import { searchSimple } from "../controller/searchController.js";

const searchRouter =express()

searchRouter.get('/search',searchSimple)

export default searchRouter