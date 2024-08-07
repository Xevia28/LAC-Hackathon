const Case = require("../models/case");
const express = require("express");
// const nodemailer = require("nodemailer");

const router = express.Router();

router.route("/")
    .get(async (req, res) => {
        try {
            const cases = await Case.find();
            res.json({ data: cases, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    })
    .post(async (req, res) => {
        try {
            const newCase = await Case.create(req.body);
            // await sendSignupEmail(sanitizedName, sanitizedEmail, sanitizedRole, sanitizedPassword);
            res.status(201).json({ data: newCase, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

router.route("/:id")
    .get(async (req, res) => {
        try {
            const casee = await Case.findById(req.params.id);
            res.json({ data: casee, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    })
    .put(async (req, res) => {
        try {
            const casee = await Case.findByIdAndUpdate(req.params.id, req.body);
            res.json({ data: casee, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    })
    .delete(async (req, res) => {
        try {
            const casee = await Case.findByIdAndDelete(req.params.id);
            res.json({ data: casee, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    });

module.exports = router