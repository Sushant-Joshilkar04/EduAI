const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const verifyToken = require("../middleware/auth");
const { uploadPDFAndGenerateAI,getMyDocuments,getDataById,deleteDocument } = require("../Controller/pdfController");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "eduai-pdfs",
    resource_type: "raw", 
    allowed_formats: ["pdf"],
    public_id: (req, file) => {
      const timestamp = Date.now();
      const originalName = file.originalname.replace(/\.[^/.]+$/, "");
      return `${originalName}-${timestamp}`;
    },
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
}

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, 
  }
});

const handleUpload = (req, res, next) => {
  upload.single("pdf")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size too large. Maximum 10MB allowed.' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

router.post("/upload", verifyToken,handleUpload, uploadPDFAndGenerateAI);
router.get("/data/:id", verifyToken,getDataById);
router.get("/mydocs", verifyToken,getMyDocuments);
router.delete("/delete/:id", verifyToken, deleteDocument);


module.exports = router;