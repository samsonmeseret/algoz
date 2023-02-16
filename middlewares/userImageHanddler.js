const multer = require("multer");
const AppError = require("../utils/AppError");
const sharp = require("sharp");

const storage = multer.memoryStorage();

const fileFilter = function (req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! please upload Only images.", 400), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

exports.profilePhotoUploader = upload.single("photo");

exports.resizeUserPhotoUpdate = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

exports.resizeUserPhotoSignup = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};
