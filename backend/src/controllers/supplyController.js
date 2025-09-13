// Controller function to fetch all supply data
const getAllSupply = (req, res) => { // define controller function
  const dummyData = [
    { date: "2021-08-01", hour: 1, generator: "ABKENORA", fuel: "HYDRO", value: 11 },
    { date: "2021-08-01", hour: 1, generator: "ABKENORA", fuel: "HYDRO", value: 5 },
    { date: "2021-08-01", hour: 1, generator: "ADELAIDE", fuel: "WIND",  value: 60 },
    { date: "2021-08-01", hour: 1, generator: "ADELAIDE", fuel: "WIND",  value: 7 },
    { date: "2021-08-01", hour: 1, generator: "ADELAIDE", fuel: "WIND",  value: 8 },
  ];


  res.json({ // send JSON response to client
    success: true, // indicate success
    message: "Fetched supply data", // response message
    data: dummyData // return dummy data
  });
};

//*************************************************************************/
// Controller function to create new supply data
const createSupply = (req, res) => { // define controller function
  const { date, hour, generator, fuel, value } = req.body; // extract data from request body
  
  // Basic validation (optional but recommended)
  if (!date || !hour || !generator || !fuel || value === undefined) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: date, hour, generator, fuel, value"
    });
  }
  
  // In a real app, you'd save to database here
  // For now, we'll just simulate successful creation
  const newSupply = { // create new supply object
    date,
    hour,
    generator,
    fuel,
    value,
    id: Date.now() // simulate auto-generated ID
  };
  
  res.status(201).json({ // send JSON response with 201 (Created) status
    success: true, // indicate success
    message: "Supply data created successfully", // response message
    data: newSupply // return the created supply data
  });
};

/*************************************************************************/
module.exports = { getAllSupply, createSupply }; // export both controller functions

