import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export async function createOrder(req, res) {
  const order = {
    intent: "CAPTURE", // Payment intent set to "CAPTURE"
    purchase_units: [
      {
        amount: {
          currency_code: "USD", // Currency code set to "USD"
          value: "100.00", // Payment amount set to $100.00
        },
      },
    ],
    application_context: {
      brand_name: "My Tienda", // Brand name for the application context
      user_action: "PAY_NOW", // User action set to "PAY_NOW"
      return_url: `${process.env.HOST}:${process.env.PORT}/capture-orden`, // Return URL for successful payment capture
      cancel_url: `${process.env.HOST}:${process.env.PORT}/cancel-orden`, // Cancel URL for payment cancellation
    },
  };

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  // Obtain access token from PayPal API using client credentials
  const {
    data: { access_token },
  } = await axios.post(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    params,
    {
      auth: {
        username: process.env.CLIENT_ID, // PayPal client ID
        password: process.env.SECRET_KEY, // PayPal secret key
      },
    }
  );

  console.log(access_token); // Log the access token for debugging purposes

  // Make a request to create a new payment order with PayPal API
  const response = await axios.post(
    `${process.env.DOMINIO}/v2/checkout/orders`, // PayPal API endpoint for creating orders
    order, // The order object containing payment details
    {
      headers: {
        Authorization: `Bearer ${access_token}`, // Include the access token in the request header
      },
    }
  );

  // Return the response data as JSON
  return res.json(response.data);
}

export async function captureOrder(req, res) {
  const { token } = req.query;
  const response = await axios.post(
    `${process.env.DOMINIO}/v2/checkout/orders/${token}/capture`,
    {},
    {
      auth: {
        username: process.env.CLIENT_ID,
        password: process.env.SECRET_KEY,
      },
    }
  );
  res.json("Payed");
}

export function cancelOrder(req, res) {
  res.redirect("/");
}
