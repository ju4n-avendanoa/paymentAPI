import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export async function createOrder(req, res) {
  const order = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100.00",
        },
      },
    ],
    application_context: {
      brand_name: "My Tienda",
      user_action: "PAY_NOW",
      return_url: `${process.env.HOST}:${process.env.PORT}/capture-orden`,
      cancel_url: `${process.env.HOST}:${process.env.PORT}/cancel-orden`,
    },
  };

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const {
    data: { access_token },
  } = await axios.post(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    params,
    {
      auth: {
        username: process.env.CLIENT_ID,
        password: process.env.SECRET_KEY,
      },
    }
  );
  console.log(access_token);
  const response = await axios.post(
    `${process.env.DOMINIO}/v2/checkout/orders`,
    order,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
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
