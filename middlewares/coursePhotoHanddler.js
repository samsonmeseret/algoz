const multer = require("multer");
const AppError = require("../utils/AppError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/course");
  },
  filename: function (req, file, cb) {
    // cd(null, new Date().toString() + file.originalname);

    //user-28649179-33336668.jpg
    const ext = file.mimetype.split("/")[1];
    cb(null, `course-${req.user.id}-${Date.now()}.${ext}`);
  },
});

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

exports.coursePhotoUploader = upload.single("photo");
