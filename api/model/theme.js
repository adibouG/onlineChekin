const { BaseEntity } = require("typeorm");

class Theme extends BaseEntity {
    constructor(id, name, primaryBackgroundColor, primaryTextColor) {
        super();
        this.id = id;
        this.name = name;
        this.primaryBackgroundColor = primaryBackgroundColor;
        this.primaryTextColor = primaryTextColor;
    }
}

module.exports = { 
    Theme: Theme 
}