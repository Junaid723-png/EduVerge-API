import Express from "express";
import TextElement from "../models/textElement.model.js";

export const textElementController = Express.Router();

// GET all text elements
textElementController.get("/", async (req, res) => {
    try {
        const textElements = await TextElement.findAll();
        return res.status(200).json(textElements);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET text element by ID
textElementController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const textElement = await TextElement.findByPk(id);

        if (!textElement) {
            return res.status(404).json({ error: "Text element not found" });
        }

        return res.status(200).json(textElement);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new text element
textElementController.post("/", async (req, res) => {
    try {
        const { interactiveModeId, time, context, run } = req.body;

        if (!interactiveModeId) {
            return res.status(400).json({ error: "Interactive mode ID is required" });
        }

        const textElement = await TextElement.create({
            id: `te_${Date.now()}`,
            interactiveModeId,
            time,
            context,
            run: run || false
        });

        return res.status(201).json(textElement);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT update text element
textElementController.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { time, context, run } = req.body;

        const textElement = await TextElement.findByPk(id);
        if (!textElement) {
            return res.status(404).json({ error: "Text element not found" });
        }

        await textElement.update({
            time: time || textElement.time,
            context: context || textElement.context,
            run: run !== undefined ? run : textElement.run
        });

        return res.status(200).json(textElement);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE text element
textElementController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const textElement = await TextElement.findByPk(id);

        if (!textElement) {
            return res.status(404).json({ error: "Text element not found" });
        }

        await textElement.destroy();
        return res.status(200).json({ message: "Text element deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});