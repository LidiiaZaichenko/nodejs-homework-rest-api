import { Schema, model } from "mongoose";
import {handleSaveError, addUpdateSettings} from "./hooks.js";
import Joi from "joi";

const contactSchema = new Schema(  {
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
},{versionKey: false, timestamps: true});

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" must be exist`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})


contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", addUpdateSettings);
contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

export default Contact;
