import {Request, Response, NextFunction} from "express";
import * as companyService from "./../Services/companyService.js"

export async function validateAPIKey (req: Request, res: Response, next : NextFunction) {

     const { authorization } = req.headers;
     const API_Key = authorization?.replace('Bearer', '').trim();
 
     const checkAPI_Key = await companyService.findCompanyAPI(API_Key);

     if (!checkAPI_Key) {
        throw {
            name: "notAuthorized",
            message: "Invalid API Key"
        }
    }

    next();
}
