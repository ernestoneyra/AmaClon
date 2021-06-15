//API that saves files in the uploads folder with a timestamp

import multer from "multer";
import express from "express";
import {isAuth} from '../utils.js'

const uploadRouter = express.Router();

//storage for images
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

//upload.single('image') telling multer that I am expecting a single file and the name of the file is image
uploadRouter.post("/", isAuth, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default uploadRouter;
