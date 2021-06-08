
export default async (req, res) => {

  // TODO: get this from db
  console.log("NEXT API FETCH req")
  console.log(req)
let url =`${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/reservation?token=${req.query.token}` ;
let reservation = await axios.get(url) ;

  
console.log(reservation.data)
  // TODO: locale based on header

  res.status(200).send(reservation.data) 

}
