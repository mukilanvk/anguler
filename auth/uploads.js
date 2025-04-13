import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const simpleName = `${Date.now()}${path.extname(file.originalname)}`; 
    cb(null, simpleName);   
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { files: 5}
}).array("productImage", 5);


export const uploadMultiple = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message:  "Image upload failed.",
      });
    }
    next();
  });
};