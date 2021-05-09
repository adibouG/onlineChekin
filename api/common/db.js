const typeorm = require("typeorm");
const Hotel = require("../model/hotel").Hotel
const environment = process.env.NODE_ENV || "dev";

async function getConfiguration() {
    // Disabled to test on heroku
    // if (environment !== "dev") {
    //     return new Promise((s) => {s()});
    // }
    return require("../../ormconfig.dev.json");
}

async function connect() {
    const manager = typeorm.getConnectionManager()
    if (manager.has("default")) {
        return new Promise((s) => {s()});
    }
    const options = await getConfiguration();
    return typeorm.createConnection(options);
}

function hotels() {
    return typeorm.getRepository(Hotel)
}

module.exports = {
    connect: connect,
    hotels: hotels
};