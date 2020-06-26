const express = require("express");
const { join } = require("path");
const {
  read,
  append,
  remove,
  getById,
  search,
  getByIdAndUpdate,
} = require("../helpers/json.helpers");
const { write } = require("../helpers/file.helpers");
const router = express.Router();
const multer = require("multer");
const upload = multer({});
let dataPathName = join(__dirname, "./products.json");
let photoPathName = join(__dirname, "../uploads/products/");
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    let result = await getById(dataPathName, id);
    if (result !== -1) {
      res.send(result);
    } else {
      let error = new Error(`I couldn't find the product which has ${id}`);
      error.statusCode = 404;
      next(error);
    }
  } else {
    let error = new Error("Missing id parameter!");
    error.statusCode = 500;
    next(error);
  }
});
router.get("/search/:query", async (req, res, next) => {
  const { query } = req.params;
  if (query) {
    let results = await search(dataPathName, query);
    res.send(results);
  } else {
    let results = await read(dataPathName);
    res.send(results);
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
      let updated = await append(
        dataPathName,
        { ...req.body, updatedAt: new Date(), createdAt: new Date() },
        "product"
      );
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
      updatedAt: new Date(),
    });
    res.send(update);
  } catch (error) {
    next(error);
  }
});
router.put("/:id/photo", upload.single("photo"), async (req, res, next) => {
  try {
    const { id } = req.params;
    let file = req.file;
    const { originalname } = file; // es6
    const [name, extension] = originalname.split(".");
    let written = await write(photoPathName, id, file);
    let url = `http://localhost:3003/photos/products/${id}.${extension}`;
    let noImageProduct = await getById(dataPathName, id);
    let updated = await getByIdAndUpdate(dataPathName, id, {
      ...noImageProduct,
      image: url,
    });
    res.send(updated);
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
