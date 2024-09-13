import { Router } from "express";
import { contactsController } from "../controllers/ContactsController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactsRoutes = Router();

contactsRoutes.post("/search", verifyToken, contactsController.searchContacts);

export default contactsRoutes;
