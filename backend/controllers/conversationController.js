const Conversation = require("../models/conversation");
const express = require("express");

const router = express.Router();

router.route("/")
    .get(async (req, res) => {
        try {
            const conversations = await Conversation.find();
            res.json({ data: conversations, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    })
    .post(async (req, res) => {
        try {
            const newConversation = await Conversation.create(req.body);
            res.status(201).json({ data: newConversation, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

router.route("/:id")
    .get(async (req, res) => {
        try {
            const conversatione = await Conversation.findById(req.params.id);
            res.json({ data: conversatione, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    })
    .put(async (req, res) => {
        try {
            const conversatione = await Conversation.findByIdAndUpdate(req.params.id, req.body);
            res.json({ data: conversatione, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    })
    .delete(async (req, res) => {
        try {
            const conversatione = await Conversation.findByIdAndDelete(req.params.id);
            res.json({ data: conversatione, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    });

module.exports = router