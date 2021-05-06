const db = require("./common/db");
const Hotel = require("./model/hotel").Hotel;

module.exports = async (req, res) => {
    const hotels = db.hotels();
    const result = await hotels.find({take: 1});
    console.log(result);
    res.send({
        theme: {
            colors: {
                text: '#000',
                background: '#fff',
                primary: '#33e'
            }
        },
        title: `Check-in ${result[0].name}`
    });
};
