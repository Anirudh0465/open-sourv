const axios = require("axios");

const API_URL = "https://beta3.api.climatiq.io/calculate";

async function calculateTravelEmissions({ distance_km, fuelType }) {
  const body = {
    model: "cm_91C1YjSmxJdnMJnQHQx5y8",
    parameters: {
      distance: distance_km,
      distance_unit: "km",
      fuel_type: fuelType === "petrol" ? "gasoline" : fuelType
    }
  };

  try {
    const response = await axios.post(API_URL, body, {
      headers: {
        Authorization: `Bearer ${process.env.CLIMATIQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    return response.data.co2e;
  } catch (err) {
    console.error("Climatiq API Error:", err.response?.data || err.message);
    return 0;
  }
}

module.exports = { calculateTravelEmissions };

