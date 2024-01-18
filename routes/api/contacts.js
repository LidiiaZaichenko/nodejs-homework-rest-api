import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateFavoriteSchema,
} from "../../models/Contact.js";

const router = express.Router();

router.use(authenticate);

router.get("/", contactsController.getAll);

router.get("/:id", isValidId, contactsController.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.add
);

router.delete("/:id", isValidId, contactsController.deliteById);

router.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsController.updateIdContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateFavoriteSchema),
  contactsController.updateFavoriteContact
);

export default router;
