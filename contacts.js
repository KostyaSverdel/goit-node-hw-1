const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, "/db", "contacts.json");

function readFileAsync() {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

function writeFileAsync(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(contactsPath, data, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

async function listContacts() {
  try {
    const data = await readFileAsync();
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getContactById(contactId) {
  try {
    const data = await readFileAsync();
    const contacts = JSON.parse(data);
    const contact = contacts.find((item) => item.id === contactId);
    return contact;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function removeContact(contactId) {
  try {
    const data = await readFileAsync();
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((item) => item.id !== contactId);
    await writeFileAsync(JSON.stringify(updatedContacts, null, 2));
    return `Contact with ID ${contactId} has been removed.`;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await readFileAsync();
    const contacts = JSON.parse(data);
    const newContact = {
      id: Date.now(),
      name,
      email,
      phone,
    };
    const updatedContacts = [...contacts, newContact];
    await writeFileAsync(JSON.stringify(updatedContacts, null, 2));
    return 'New contact has been added.';
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
