const express = require("express");
const noteRoutes = require("./noteRouter/noteRoutes");

const Router = express.Router();  
const api = "/api/v1";           

Router.use(api, noteRoutes);     // Gunakan noteRoutes dengan prefix '/api/v1'

module.exports = Router;          