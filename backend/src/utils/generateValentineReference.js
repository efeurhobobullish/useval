import ValentineModel from "../models/valentine.js";

const generateValentineReference = async (name) => {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  let reference;
  let exists = true;

  while (exists) {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    reference = `${base}-${randomDigits}`;

    const found = await ValentineModel.findOne({ reference });
    if (!found) exists = false;
  }

  return reference;
};

export default generateValentineReference;