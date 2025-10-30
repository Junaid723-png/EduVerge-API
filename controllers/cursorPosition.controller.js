import Express from "express";
import CursorPosition from "../models/cursorPosition.model.js";

export const cursorPositionController = Express.Router();

// GET all cursor positions
cursorPositionController.get("/", async (req, res) => {
    try {
        const cursorPositions = await CursorPosition.findAll();
        return res.status(200).json(cursorPositions);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET cursor position by ID
cursorPositionController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cursorPosition = await CursorPosition.findByPk(id);

        if (!cursorPosition) {
            return res.status(404).json({ error: "Cursor position not found" });
        }

        return res.status(200).json(cursorPosition);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new cursor position
cursorPositionController.post("/", async (req, res) => {
    try {
        const { interactiveModeId, time, x, y } = req.body;

        if (!interactiveModeId) {
            return res.status(400).json({ error: "Interactive mode ID is required" });
        }

        const cursorPosition = await CursorPosition.create({
            id: `cp_${Date.now()}`,
            interactiveModeId,
            time,
            x,
            y
        });

        return res.status(201).json(cursorPosition);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT update cursor position
cursorPositionController.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { time, x, y } = req.body;

        const cursorPosition = await CursorPosition.findByPk(id);
        if (!cursorPosition) {
            return res.status(404).json({ error: "Cursor position not found" });
        }

        await cursorPosition.update({
            time: time || cursorPosition.time,
            x: x !== undefined ? x : cursorPosition.x,
            y: y !== undefined ? y : cursorPosition.y
        });

        return res.status(200).json(cursorPosition);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE cursor position
cursorPositionController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cursorPosition = await CursorPosition.findByPk(id);

        if (!cursorPosition) {
            return res.status(404).json({ error: "Cursor position not found" });
        }

        await cursorPosition.destroy();
        return res.status(200).json({ message: "Cursor position deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});