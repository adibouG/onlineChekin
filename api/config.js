const db = require("./common/db");
const Hotel = require("./model/hotel").Hotel;

module.exports = async (req, res) => {
    const hotels = db.hotels();
    const result = await hotels.find({take: 1});
    console.log(result);
    res.send({
        theme: {
            colors: {
                primaryBackground: result[0].theme.primaryBackgroundColor,
                primaryText: result[0].theme.primaryTextColor
            }
        },
        title: `Check-in ${result[0].name}`
    });
};
