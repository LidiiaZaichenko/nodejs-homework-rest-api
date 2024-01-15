import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const updateContact = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async (id) => {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === id);
  return result || null;
};

export const addContact = async (data) => {
  const contact = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contact.push(newContact);
  await updateContact(contact);
  return newContact;
};

export const removeContact = async (id) => {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contact.splice(index, 1);
  await updateContact(contact);
  return result;
};
