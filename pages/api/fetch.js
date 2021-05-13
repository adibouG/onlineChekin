const axios = require('axios');

export default async (req, res) => {
  await axios({
      method: 'get',
      url: 'https://api.vercel.com/www/user',
      headers: { 'Authorization': `Bearer ${process.env.TOKEN}` }
    })
    .then(response => res.status(200).json({name: response.data.user.email}))
    .catch(error => res.status(200).send(error));
}
