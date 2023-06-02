const argv = require("yargs").argv;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      list = await listContacts();
      if (!list) return console.log("contacts not found");
      console.table(list);
      break;

    case "get":
      const contactId = await getContactById(id);
      if (!contactId) return console.log("contact not found");
      console.log("contact: ", contactId);
      break;

    case "add":
      const contact = await addContact(name, email, phone);
      console.log("contact added:", contact);
      break;

    case "remove":
      const deletedContact = await removeContact(id);
      if (!deletedContact) return console.log("contact not found");
      console.log("this contact was remove: ", deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);