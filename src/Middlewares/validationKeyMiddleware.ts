import {Request, Response, NextFunction} from "express";
import * as companyRepository from "./../repositories/companyRepository.js";

export async function validateAPIKey (req: Request, res: Response, next : NextFunction) {

    const API_Key = req.headers["x-api-key"];
 
     const checkAPI_Key = await companyRepository.findByApiKey(API_Key.toString());

     if (!checkAPI_Key) {
        throw {
            name: "notAuthorized",
            message: "Invalid API Key"
        }
    }
    next();
}
