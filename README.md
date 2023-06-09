# PayPal Order Creation Project

This project aims to create and capture payment orders using the PayPal API. It provides an interface to create a new payment order and redirects the user to the PayPal payment flow to complete the transaction.

## Installation

1. Clone this repository on your local machine.
2. Run the command `npm install` to install the necessary dependencies.
3. Create a `.env` file in the project's root directory and configure the following environment variables:

```dotenv
HOST=... // Your application's host address
PORT=... // The port on which your application will run
CLIENT_ID=... // Your PayPal client ID
SECRET_KEY=... // Your PayPal secret key
DOMAIN=... // The PayPal API domain (e.g., sandbox or production)
```

4. Run the command `npm start` to start the application.

## Usage

The application provides the following routes:

- `POST /order` - Create a new payment order with PayPal.
- `GET /capture-order?token={TOKEN}` - Capture an existing payment order.
- `GET /cancel-order` - Cancel a payment order.

Make sure to properly configure the routes and return URLs in the code to fit your application.

## Contribution

Contributions are welcome. If you want to contribute to this project, follow these steps:

1. Fork this repository.
2. Create a new branch with the feature or improvement you want to implement.
3. Submit a pull request to the main branch.

