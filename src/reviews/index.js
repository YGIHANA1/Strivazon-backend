const express = require("express");
const { join } = require("path");
const {
  read,
  append,
  remove,
  getById,
  search,
  getByIdAndUpdate,
  getByAnything,
} = require("../helpers/json.helpers");
const { write } = require("../helpers/file.helpers");
const router = express.Router();
const multer = require("multer");
const upload = multer({});
let dataPathName = join(__dirname, "./reviews.json");

router.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  if (productId) {
    let result = await getByAnything(dataPathName, "productId", productId);
    if (result !== -1) {
      res.send(result);
    } else {
      let error = new Error(
        `I couldn't find the review which has ${productId}`
      );
      error.statusCode = 404;
      next(error);
    }
  } else {
    let error = new Error("Missing id parameter!");
    error.statusCode = 500;
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  let data = await read(dataPathName);
  res.send({ data });
});
router.post("/", async (req, res, next) => {
  const { body } = req;

  try {
    if (body === {}) {
      let error = new Error("Missing parameter body!");
      error.statusCode = 500;
      next(error);
    } else {
      let updated = await append(dataPathName, req.body, "reviews");
      res.send(updated);
    }
  } catch (error) {
    next(error);
  }
});
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    let oldObject = await getById(dataPathName, id);
    let update = await getByIdAndUpdate(dataPathName, id, {
      ...oldObject,
      ...body,
    });
    res.send(update);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    let removed = await remove(dataPathName, id);
    res.send(removed);
  } else {
    let error = new Error("Missing id parameter!");
    error.statusCode = 500;
    next(error);
  }
});

module.exports = router;
