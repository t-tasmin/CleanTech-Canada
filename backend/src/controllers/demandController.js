// Controller function to fetch all demand data
const getAllDemand = (req, res) => { // define controller function
  const dummyData = [ // create hardcoded dummy data
    { date: "2025-01-01", hour: 1, marketDemand: 17247, ontarioDemand: 13887 },
    { date: "2025-01-01", hour: 2, marketDemand: 17355, ontarioDemand: 13722 }
  ];

  res.json({ // send JSON response to client
    success: true, // indicate success
    message: "Fetched demand data", // response message
    data: dummyData // return dummy data
  });
};


//*************************************************************************/

const createDemand = (req, res) => { // define controller function
  const { date, hour, marketDemand, ontarioDemand } = req.body; // extract data from request body
  
  // Basic validation (optional but recommended)
  if (!date || !hour || !marketDemand || !ontarioDemand) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: date, hour, marketDemand, ontarioDemand"
    });
  }
  
  // In a real app, you'd save to database here
  // For now, we'll just simulate successful creation
  const newDemand = { // create new demand object
    date,
    hour,
    marketDemand,
    ontarioDemand,
    id: Date.now() // simulate auto-generated ID
  };
  
  res.status(201).json({ // send JSON response with 201 (Created) status
    success: true, // indicate success
    message: "Demand data created successfully", // response message
    data: newDemand // return the created demand data
  });
};

module.exports = { getAllDemand, createDemand }; // export controller function
