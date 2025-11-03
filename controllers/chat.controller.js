import Express from "express";
import Chat from "../models/chat.model.js";

export const chatController = Express.Router();

// GET all chat messages
chatController.get("/", async (req, res) => {
    try {
        const chatMessages = await Chat.findAll();
        return res.status(200).json(chatMessages);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET chat message by ID
chatController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const chatMessage = await Chat.findByPk(id);

        if (!chatMessage) {
            return res.status(404).json({ error: "Chat message not found" });
        }

        return res.status(200).json(chatMessage);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

chatController.get("/group/:studyGroupId", async (req, res) => {
    const { studyGroupId } = req.params;
    try {
        const chatsForGroup = await Chat.findAll({
            where: { studyGroupId },
            order: [['createdAt', 'DESC']]
        });
        const userStudyGroupChats = [];
                
        for (const chat of chatsForGroup) {
            const studyGroupChat = await Chat.findByPk(chat.id);
            if (studyGroupChat) {
                userStudyGroupChats.push(studyGroupChat.dataValues);
            }
        }
        
        return res.status(200).json(userStudyGroupChats);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

// POST create new chat message
chatController.post("/", async (req, res) => {
    try {
        const { studyGroupId, senderId, message, messageType, fileUrl } = req.body;

        if (!studyGroupId || !senderId || !message) {
            return res.status(400).json({ error: "Study group ID, sender ID, and message are required" });
        }

        const chatMessage = await Chat.create({
            id: `chat_${Date.now()}`,
            studyGroupId,
            senderId,
            message,
            messageType: messageType || 'text',
            fileUrl,
            sentAt: new Date()
        });
        return res.status(201).json(chatMessage);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE chat message
chatController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const chatMessage = await Chat.findByPk(id);

        if (!chatMessage) {
            return res.status(404).json({ error: "Chat message not found" });
        }

        await chatMessage.destroy();
        return res.status(200).json({ message: "Chat message deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});