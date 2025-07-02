const express = require("express");
const router = express.Router();
const multer = require("multer");
const { 
  uploadPDFAndGeneratePodcast, 
  getMyPodcasts, 
  getPodcastById 
} = require("../Controller/speechController");

const upload = multer({ 
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, 
  }
});

// Routes
router.post("/upload", upload.single("pdf"), uploadPDFAndGeneratePodcast);
router.get("/my-podcasts", getMyPodcasts);
router.get("/podcast/:id", getPodcastById);

module.exports = router;