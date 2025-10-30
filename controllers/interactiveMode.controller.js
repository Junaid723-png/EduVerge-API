import Express from "express";
import InteractiveMode from "../models/InteractiveMode.model.js";

export const interactiveModeController = Express.Router();

// GET all interactive modes
interactiveModeController.get("/", async (req, res) => {
    try {
        const interactiveModes = await InteractiveMode.findAll();
        return res.status(200).json(interactiveModes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET interactive mode by ID
interactiveModeController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const interactiveMode = await InteractiveMode.findByPk(id);

        if (!interactiveMode) {
            return res.status(404).json({ error: "Interactive mode not found" });
        }

        return res.status(200).json(interactiveMode);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new interactive mode
interactiveModeController.post("/", async (req, res) => {
    try {
        const { courseId, fileType, fileName } = req.body;

        if (!courseId || !fileType || !fileName) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const interactiveMode = await InteractiveMode.create({
            id: `im_${Date.now()}`,
            courseId,
            fileType,
            fileName
        });

        return res.status(201).json(interactiveMode);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT update interactive mode
interactiveModeController.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { fileType, fileName } = req.body;

        const interactiveMode = await InteractiveMode.findByPk(id);
        if (!interactiveMode) {
            return res.status(404).json({ error: "Interactive mode not found" });
        }

        await interactiveMode.update({
            fileType: fileType || interactiveMode.fileType,
            fileName: fileName || interactiveMode.fileName
        });

        return res.status(200).json(interactiveMode);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE interactive mode
interactiveModeController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const interactiveMode = await InteractiveMode.findByPk(id);

        if (!interactiveMode) {
            return res.status(404).json({ error: "Interactive mode not found" });
        }

        await interactiveMode.destroy();
        return res.status(200).json({ message: "Interactive mode deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});