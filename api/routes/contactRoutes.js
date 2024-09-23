import { Router } from "express";
import { contactsController } from "../controllers/ContactsController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactsRoutes = Router();

contactsRoutes.post("/search", verifyToken, contactsController.searchContacts);
contactsRoutes.get(
  "/get-contacts-dm",
  verifyToken,
  contactsController.getContactsDM
);

export default contactsRoutes;
