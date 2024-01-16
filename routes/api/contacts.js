import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import {isEmptyBody} from "../../middlewares/index.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getById);

router.post("/", isEmptyBody, contactsController.add);

router.delete("/:id", contactsController.deliteById);

router.put("/:id", isEmptyBody, contactsController.updateIdContact);

export default router;
