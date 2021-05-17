const axios = require('axios');

export default async (req, res) => {

  // This is a working example of how in here we can call whatever third party
  // to fetch exxternal data and return that (how ever we like).

  await axios({
      method: 'get',
      url: 'https://api.vercel.com/www/user',
      headers: { 'Authorization': `Bearer ${process.env.TOKEN}` }
    })
    .then(response => res.status(200).json({name: response.data.user.email}))
    .catch(error => res.status(200).send(error));
}
