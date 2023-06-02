const yargs = require("yargs");
const contacts = require("./contacts");

const { argv } = yargs
  .command({
    command: "list",
    describe: "List all contacts",
    handler: () => {
      contacts.listContacts();
    },
  })
  .command({
    command: "get <id>",
    describe: "Get contact by ID",
    handler: (argv) => {
      contacts.getContactById(argv.id);
    },
  })
  .command({
    command: "add <name> <email> <phone>",
    describe: "Add a new contact",
    handler: (argv) => {
      contacts.addContact(argv.name, argv.email, argv.phone);
    },
  })
  .command({
    command: "remove <id>",
    describe: "Remove contact by ID",
    handler: (argv) => {
      contacts.removeContact(argv.id);
    },
  })
  .demandCommand()
  .help();

function invokeAction(argv) {
  const { _: [action] } = argv;
  switch (action) {
    case "list":
      contacts.listContacts();
      break;
    case "get":
      contacts.getContactById(argv.id);
      break;
    case "add":
      contacts.addContact(argv.name, argv.email, argv.phone);
      break;
    case "remove":
      contacts.removeContact(argv.id);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
