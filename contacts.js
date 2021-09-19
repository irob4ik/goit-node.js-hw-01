const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.resolve(__dirname + '/db/contacts.json');

// TODO: задокументировать каждую функцию
async function listContacts(flag) {
    try {
        const data = await fs.readFile(contactsPath);

        if (flag) {
            return JSON.parse(data);
        }
        return console.table(JSON.parse(data));

    } catch (err) {
        console.log(err.message)
    }
}

async function getContactById(contactId) {
    try {
        const data = await listContacts(1);
        const contact = data.find(item => item.id === Number(contactId));

        if (contact) {
            return console.table(contact);
        }
        return console.log("Requested contact was not found");

    } catch (err) {
        console.log(err.message);
    }
}

async function removeContact(contactId) {
    try {
        const data = await listContacts(1);
        const newContactsList = data.filter(item => item.id !== Number(contactId));

        fs.writeFile(contactsPath, JSON.stringify(newContactsList));

        console.log("Contact was deleted");
    } catch (err) {
        console.log(err.message);
    }
}

async function addContact(name, email, phone) {
    try {
        const newContact = {
            id: shortid.generate(),
            name,
            email,
            phone
        }

        const data = await listContacts(1);

        const newContactsList = [...data, newContact];

        fs.writeFile(contactsPath, JSON.stringify(newContactsList));
        console.log("Contact was added");
    } catch (error) {
        console.log(err.message);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}