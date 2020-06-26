const fs = require("fs-extra");
const uniqid = require("uniqid");

const read = async (pathName) => {
  let json = await fs.readJson(pathName);
  return json;
};

const append = async (pathName, data, type) => {
  let jsonArray = await fs.readJson(pathName);
  jsonArray = [...jsonArray, { ...data, id: uniqid(), type }];
  let writtenFile = fs.writeJson(pathName, jsonArray);
  return jsonArray;
};
const remove = async (pathName, id) => {
  let jsonArray = await fs.readJson(pathName);
  jsonArray = jsonArray.filter((object) => object.id !== id);
  let writtenFile = fs.writeJson(pathName, jsonArray);
  return jsonArray;
};
const getById = async (pathName, id) => {
  let jsonArray = await fs.readJson(pathName);
  let filtered = jsonArray.filter((object) => object.id === id);
  if (filtered.length > 0) {
    return filtered[0];
  } else {
    return -1;
  }
};
const getByAnything = async (pathName, key, value) => {
  let jsonArray = await fs.readJson(pathName);
  let filtered = jsonArray.filter((object) => object[key] === value);
  if (filtered.length > 0) {
    return filtered[0];
  } else {
    return -1;
  }
};
const getByIdAndUpdate = async (pathName, id, updateObject) => {
  let jsonArray = await fs.readJson(pathName);
  let indexOfObject = jsonArray.findIndex((object) => object.id === id);
  jsonArray[indexOfObject] = updateObject;
  let written = fs.writeJson(pathName, jsonArray);
  return jsonArray[indexOfObject];
};
const search = async (pathName, query) => {
  let jsonArray = await fs.readJson(pathName);
  let q = query.toLowerCase();
  let filtered = jsonArray.filter((object) =>
    object.name.toLowerCase().includes(q)
  );
  if (filtered.length > 0) {
    return filtered;
  } else {
    return [];
  }
};
module.exports = {
  read,
  append,
  remove,
  getById,
  search,
  getByIdAndUpdate,
  getByAnything,
};
