const express = require("express");
const morgan = require("morgan");
const app = express();

let contactData = [
  {
    firstName: "Mike",
    lastName: "Jones",
    phoneNumber: "281-330-8004",
  },
  {
    firstName: "Jenny",
    lastName: "Keys",
    phoneNumber: "768-867-5309",
  },
  {
    firstName: "Max",
    lastName: "Entiger",
    phoneNumber: "214-748-3647",
  },
  {
    firstName: "Alicia",
    lastName: "Keys",
    phoneNumber: "515-489-4608",
  },
];

const sortContacts = contacts => {
  return contacts.slice().sort((contactA, contactB) => {
    if (contactA.lastName < contactB.lastName) {
      return -1;
    } else if (contactA.lastName > contactB.lastName) {
      return 1;
    } else if (contactA.firstName < contactB.firstName) {
      return -1;
    } else if (contactA.firstName > contactB.firstName) {
      return 1;
    } else {
      return 0;
    }
  });
};

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.redirect("/contacts");
});

app.get("/contacts", (req, res) => {
  res.render("contacts", {
    contacts: sortContacts(contactData),
  });
});

app.get("/contacts/new", (req, res) => {
  res.render("new-contact");
});

app.post("/contacts/new", (req, res) => {
  let errorMessages = [];
  if (req.body.firstName.legnth === 0) {
    errorMessages.push("First name is required");
  }

  if (req.body.lastName.length === 0) {
    errorMessages.push("Last name is required");
  }

  if (req.body.phoneNumber.length === 0) {
    errorMessages.push("Phone number is required");
  }

  if (errorMessages.length > 0) {
    res.render("new-contact", {
      errorMessages: errorMessages,
    });
  } else {
    contactData.push({...req.body});
    res.redirect("/contacts");
  }
});

app.listen(3000, "localhost", () => {
  console.log("Listening to port 3000...");
});



