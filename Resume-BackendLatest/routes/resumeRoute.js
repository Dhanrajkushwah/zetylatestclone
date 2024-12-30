const express = require("express");
const {
    createResume,
    deleteResume,
    exportResume,
    generatePdf,
    getAllResumes,
    getResumeById,
    updateResume
} = require("../controllers/resumeController.js");
const { uploadMiddleware } = require("../utils/middleware/upload.js");

const router = express.Router();

router.post("/resume/create", uploadMiddleware, createResume); // create resume
router.put("/resume/update/:id", uploadMiddleware, updateResume); // update resume
router.delete("/resume/delete/:id", deleteResume); // delete resume
router.get("/resume/:id", getResumeById); // get resume by id
router.get("/resume/", getAllResumes); // get all resumes
router.get("/resume/download/:id", generatePdf); // download pdf
router.get("/resume/:id/export", exportResume); // export pdf

module.exports = router;
