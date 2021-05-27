export default async (req, res) => {

  // TODO: get this from db

  const start = new Date()
  const end = new Date(start.getDate() + 2)
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  const locale = undefined
  const startDate = start.toLocaleDateString(locale, options)
  const endDate = end.toLocaleDateString(locale, options)

  // TODO: locale based on header

  res.status(200).json({
    guest: {
      fullName: "Franciscus Hubertus Schouenberg"
    },
    reservation: {
      startDate: startDate,
      endDate: endDate,
      guestCount: 2,
      roomType: "Queens Room Deluxe",
      options: ["Breakfast", "Late Checkout"]
    }
  })
}
