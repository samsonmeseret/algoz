const multer = require("multer");
const AppError = require("../utils/AppError");

// storage Stratagies for PDF
const storageForPdf = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, "./public/resources/pdf");
    } else {
      cb({ error: "file type not supported" });
    }
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `course-pdf-${req.user.id}-${Date.now()}.${ext}`);
  },
});

// Storage Stratagies for CV PDF
const storageForCV = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, "./public/cv");
    } else {
      cb(new AppError("Only PDF is Supported", 404));
    }
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `CV-${req.user.id}-${Date.now()}.${ext}`);
  },
});

// Storage Stratagies for QA Image/ IMAGE
const storageForQAImages = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, "./public/img/QA");
    } else {
      cb(new AppError("Only Image type jpeg/jpg/png are Supported"));
    }
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `QA-${req.user.id}-${Date.now()}.${ext}`);
  },
});

// Storage Stratagies for Video
const storageForVedio = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.filename === "video/gif" ||
      file.filename === "video/mp4" ||
      file.filename === "video/wmv"
    ) {
      cb(null, "./public/resources/video");
    } else {
      cb({ error: "file type not supported" });
    }
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `Video-Resourse-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const uploadPDF = multer({
  storage: storageForPdf,
});

const uploadQAImage = multer({
  storage: storageForQAImages,
});

const uploadVideo = multer({
  storage: storageForVedio,
});

const uploadCV = multer({
  storage: storageForCV,
});

exports.QAImageHanddler = uploadQAImage.single("image");
exports.PDFuploadHanddler = uploadPDF.fields([{ name: "pdf", maxCount: 5 }]);
exports.uploadCVHanddler = uploadCV.single("cv");
exports.videoHanddler = uploadVideo.fields([{ name: "video", maxCount: 5 }]);
