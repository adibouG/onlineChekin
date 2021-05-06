const EntitySchema = require("typeorm").EntitySchema;
const Hotel = require("../model/hotel").Hotel;

module.exports = new EntitySchema({
    name: "Hotel",
    target: Hotel,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        }
    }
});
