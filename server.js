const express = require("express");
const productsRouter = require("./src/products");
const port = process.env.PORT;
const server = express();
const { join } = require("path");
const { notFound, sourceNotFound, parameterError } = require("./src/errors");
const cors = require("cors");
//Routes
server.use(express.json());
server.use(cors()); // accessing from outside of backend
server.use("/products", productsRouter);
server.use("/reviews", require("./src/reviews/"));
server.use("/users", require("./src/user/"));
server.use(
  "/photos/avatars",
  express.static(join(__dirname, "./src/uploads/avatars/"))
);
server.use(
  "/photos/products",
  express.static(join(__dirname, "./src/uploads/products/"))
);
server.use(parameterError);
server.use(notFound);
server.listen(port, () => {
  console.log(
    `the server is running on port on ${process.env.API_URL}:${port}`
  );
});
