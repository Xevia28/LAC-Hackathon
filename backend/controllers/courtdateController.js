const Courtdate = require("../models/courtdate");
const express = require("express");
// const nodemailer = require("nodemailer");

const router = express.Router();

router.route("/")
    .get(async (req, res) => {
        try {
            const cases = await Courtdate.find();
            res.json({ data: cases, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    })
    .post(async (req, res) => {
        try {
            const newCourtdate = await Courtdate.create(req.body);
            // await sendSignupEmail(sanitizedName, sanitizedEmail, sanitizedRole, sanitizedPassword);
            res.status(201).json({ data: newCourtdate, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

router.route("/:id")
    .get(async (req, res) => {
        try {
            const casee = await Courtdate.findById(req.params.id);
            res.json({ data: casee, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    })
    .put(async (req, res) => {
        try {
            const casee = await Courtdate.findByIdAndUpdate(req.params.id, req.body);
            res.json({ data: casee, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    })
    .delete(async (req, res) => {
        try {
            const casee = await Courtdate.findByIdAndDelete(req.params.id);
            res.json({ data: casee, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    });

module.exports = router