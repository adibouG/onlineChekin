const { BaseEntity } = require("typeorm");

class Hotel extends BaseEntity {
    constructor(id, name) {
        super();
        this.id = id;
        this.name = name;
    }
}

module.exports = { 
    Hotel: Hotel 
}