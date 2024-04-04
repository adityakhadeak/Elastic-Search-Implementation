import express from "express";
import { searchSimple ,dynamicSearch, combinedSearch} from "../controller/searchController.js";

const searchRouter =express()

searchRouter.get('/search',searchSimple)
searchRouter.get('/dynamicsearch',dynamicSearch)
searchRouter.get('/combinedsearch',combinedSearch)

export default searchRouter