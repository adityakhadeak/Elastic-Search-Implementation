import express from "express";
import { searchSimple ,dynamicSearch} from "../controller/searchController.js";

const searchRouter =express()

searchRouter.get('/search',searchSimple)
searchRouter.get('/dynamicsearch',dynamicSearch)

export default searchRouter