import { Router } from "express";
import { postPurchase } from "../Controllers/purchaseController.js";
import { checkStatusCard, checkCardValidation, findCard, checkActiveCard, checkPassword } from "../Middlewares/cardMiddlewares.js";

const purchaseRouter = Router();

purchaseRouter.post("/purchases", findCard, checkActiveCard,
checkCardValidation, checkStatusCard, checkPassword, postPurchase);

export default purchaseRouter;