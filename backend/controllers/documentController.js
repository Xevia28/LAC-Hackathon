const Document = require("../models/document");
const express = require("express");

const router = express.Router();

router.route("/")
    .get(async (req, res) => {
        try {
            const cases = await Document.find();
            res.json({ data: cases, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    })
    .post(async (req, res) => {
        try {
            const newDocument = await Document.create(req.body);
            res.status(201).json({ data: newDocument, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

router.route("/:id")
    .get(async (req, res) => {
        try {
            const casee = await Document.findById(req.params.id);
            res.json({ data: casee, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    })
    .put(async (req, res) => {
        try {
            const casee = await Document.findByIdAndUpdate(req.params.id, req.body);
            res.json({ data: casee, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    })
    .delete(async (req, res) => {
        try {
            const casee = await Document.findByIdAndDelete(req.params.id);
            res.json({ data: casee, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    });

module.exports = router