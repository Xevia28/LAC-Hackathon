const Message = require("../models/message");
const express = require("express");
const { isAuthenticatedAsUser } = require("./authController");
const Conversation = require("../models/conversation");

const router = express.Router();

router.route("/")
    .get(async (req, res) => {
        try {
            const cases = await Message.find();
            res.json({ data: cases, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    })
    .post(async (req, res) => {
        try {
            const newMessage = await Message.create(req.body);
            res.status(201).json({ data: newMessage, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

router.route("/:id")
    .get(isAuthenticatedAsUser, async (req, res) => {
        try {
            const receiver_id = req.params.id;
            const sender_id = req.session.user._id;
            const conversation = await Conversation.findOne({
                participants: { $all: [sender_id, receiver_id] },
            }).populate("messages"); // get the actual messages instead of just referencing(id)
            if (!conversation) return res.status(200).json([]);
            const messages = conversation.messages;
            res.status(200).json(messages)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    })
    .post(isAuthenticatedAsUser, async (req, res) => {
        try {
            const { message } = req.body;
            const receiver_id = req.params.id;
            const sender_id = req.session.user._id;

            let conversation = await Conversation.findOne({
                participants: { $all: [sender_id, receiver_id] },
            })

            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [sender_id, receiver_id],
                });
            }

            const newMessage = new Message({
                sender_id,
                receiver_id,
                message
            })

            if (newMessage) {
                conversation.messages.push(newMessage._id);
            }

            // await conversation.save();
            // await newMessage.save();
            // above 2 functions same as below. below faster as it runs in parallel
            await Promise.all([conversation.save(), newMessage.save()]);

            res.status(201).json({ data: newMessage, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    })
    .put(async (req, res) => {
        try {
            const message = await Message.findByIdAndUpdate(req.params.id, req.body);
            res.json({ data: message, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    })
    .delete(async (req, res) => {
        try {
            const message = await Message.findByIdAndDelete(req.params.id);
            res.json({ data: message, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    });

module.exports = router