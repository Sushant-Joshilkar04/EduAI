const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyToken = require("../middleware/auth");
const { 
  uploadPDFAndGeneratePodcast, 
  getMyPodcasts, deletePodcastById,
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

router.post("/upload", verifyToken, upload.single("pdf"), uploadPDFAndGeneratePodcast);
router.get("/my-podcasts", verifyToken, getMyPodcasts);
router.get("/podcast/:id", verifyToken, getPodcastById);
router.delete("/delete/:id", verifyToken, deletePodcastById);

module.exports = router;