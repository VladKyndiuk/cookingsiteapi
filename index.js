const { request } = require("express");
const express = require("express");
const userRouter = require("./routes/userRoutes");
const apiErrorHandler = require("./error/api-error-handler");

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(cors())
app.use("/api", userRouter);
app.use(apiErrorHandler);

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
