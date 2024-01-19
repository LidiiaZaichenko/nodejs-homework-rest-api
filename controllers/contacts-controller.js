import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const {_id: owner} = req.user;
  const {page = 1, limit = 10} = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({owner}, "-createdAt -updatedAt",{skip, limit}).populate("owner", "username");
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const {_id: owner} = req.user;
  const result = await Contact.findOne({_id, owner});
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const {_id: owner} = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const updateIdContact = async (req, res) => {
  const { id } = req.params;
  const {_id: owner} = req.user;
  const result = await Contact.findByIdAndUpdate({_id: owner}, req.body);
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json(result);
};

const deliteById = async (req, res) => {
  const { id } = req.params;
  const {_id: owner} = req.user;
  const result = await Contact.findByIdAndDelete({_id: owner});
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json({
    message: "contact deleted",
  });
};

const updateFavoriteContact = async (req, res) => {
  const { id } = req.params;
  const {_id: owner} = req.user;
  const result = await Contact.findByIdAndUpdate({_id: owner}, req.body);
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateIdContact: ctrlWrapper(updateIdContact),
  updateFavoriteContact: ctrlWrapper(updateFavoriteContact),
  deliteById: ctrlWrapper(deliteById),
};
