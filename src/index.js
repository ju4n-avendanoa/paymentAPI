import app from "./app.js";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening at ${process.env.HOST}:${PORT}`);
});
