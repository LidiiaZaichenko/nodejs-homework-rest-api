import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody, isValidId } from "../../middlewares/index.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:id", isValidId, contactsController.getById);

router.post("/", isEmptyBody, contactsController.add);

router.delete("/:id",isValidId, contactsController.deliteById);

router.put("/:id",isValidId, isEmptyBody, contactsController.updateIdContact);

router.patch("/:id/favorite", isValidId, isEmptyBody, contactsController.updateFavoriteContact);

export default router;
