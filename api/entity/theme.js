const EntitySchema = require("typeorm").EntitySchema;
const Theme = require("../model/theme").Theme;

module.exports = new EntitySchema({
    name: "Theme",
    target: Theme,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        primaryBackgroundColor: {
            type: "varchar"
        },
        primaryTextColor: {
            type: "varchar"
        }
    }
});
