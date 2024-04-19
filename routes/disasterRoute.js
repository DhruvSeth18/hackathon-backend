import express from "express";
import {getAllDisaster,getSingleDisaster,donationToSingleDisaster,getLatestDonation} from '../controllers/disasterController.js';
const disasterRoute = express.Router();
export const donation = express.Router();
import middlewareAuth from "../controllers/middleAuth.js";

disasterRoute.route('/disaster')    
.get(getAllDisaster);

disasterRoute.route('/disaster/:disasterId')
.get(getSingleDisaster)
.post(middlewareAuth,donationToSingleDisaster);

donation.route('/donation')
.get(getLatestDonation);

export default disasterRoute;