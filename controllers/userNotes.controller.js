import Express from "express";
import UserNotes from "../models/user.model.js";

export const userNotesController = Express.Router();

// GET all user notes
userNotesController.get("/", async (req, res) => {
    try {
        const userNotes = await UserNotes.findAll();
        return res.status(200).json(userNotes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET user notes by ID
userNotesController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userNotes = await UserNotes.findByPk(id);

        if (!userNotes) {
            return res.status(404).json({ error: "User notes not found" });
        }

        return res.status(200).json(userNotes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new user notes
userNotesController.post("/", async (req, res) => {
    try {
        const { userId, courseId, lessonId } = req.body;

        if (!userId || !courseId || !lessonId) {
            return res.status(400).json({ error: "User ID, course ID, and lesson ID are required" });
        }

        const userNotes = await UserNotes.create({
            id: `un_${Date.now()}`,
            userId,
            courseId,
            lessonId
        });

        return res.status(201).json(userNotes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE user notes
userNotesController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userNotes = await UserNotes.findByPk(id);

        if (!userNotes) {
            return res.status(404).json({ error: "User notes not found" });
        }

        await userNotes.destroy();
        return res.status(200).json({ message: "User notes deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});