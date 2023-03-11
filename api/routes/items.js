const router = require("express").Router();
const Item = require("../models/Item");
const path = require("path");
const multer = require("multer");
//MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//create an Item
router.post("/", upload.array("images", 10), async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const newItem = new Item({
    title: req.body.title,
    desc: req.body.desc,
    img: url + "/Images/" + req.files[0].filename,
    img2: url + "/Images/" + req.files[1].filename,
    img3: url + "/Images/" + req.files[2].filename,
    rating: req.body.rating,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
  });
  try {
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (err) {
    next(err);
  }
});

//get all items

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a single item

router.get("/:id", async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

//UPDATE ITEM

router.put("/:id", async (req, res, next) => {
  try {
    const editedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(editedItem);
  } catch (err) {
    next(err);
  }
});

//DELETE ITEM
router.delete("/:id", async (req, res, next) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json("Item deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
