import Express from "express";
import Note from "../models/note.model.js";

export const noteController = Express.Router();

// GET all notes
noteController.get("/", async (req, res) => {
    try {
        const notes = await Note.findAll();
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET note by ID
noteController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByPk(id);

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        return res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new note
noteController.post("/", async (req, res) => {
    try {
        const { userNotesId, time, context, fileType, fileName } = req.body;

        if (!userNotesId) {
            return res.status(400).json({ error: "User notes ID is required" });
        }

        const note = await Note.create({
            noteId: `note_${Date.now()}`,
            userNotesId,
            time,
            context,
            fileType,
            fileName,
            date: new Date()
        });

        return res.status(201).json(note);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT update note
noteController.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { time, context, fileType, fileName } = req.body;

        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        await note.update({
            time: time || note.time,
            context: context || note.context,
            fileType: fileType || note.fileType,
            fileName: fileName || note.fileName
        });

        return res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE note
noteController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByPk(id);

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        await note.destroy();
        return res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});