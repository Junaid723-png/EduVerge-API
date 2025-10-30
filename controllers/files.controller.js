import Express from "express";
import Files from "../models/files.model.js";

export const filesController = Express.Router();

// GET all files
filesController.get("/", async (req, res) => {
    try {
        const files = await Files.findAll();
        return res.status(200).json(files);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new file entry
filesController.post("/", async (req, res) => {
    try {
        const { editModeSettingsId, file } = req.body;

        if (!editModeSettingsId || !file) {
            return res.status(400).json({ error: "Edit mode settings ID and file are required" });
        }

        const fileEntry = await Files.create({
            editModeSettingsId,
            file
        });

        return res.status(201).json(fileEntry);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE file entry
filesController.delete("/", async (req, res) => {
    try {
        const { editModeSettingsId, file } = req.body;

        if (!editModeSettingsId || !file) {
            return res.status(400).json({ error: "Edit mode settings ID and file are required" });
        }

        const fileEntry = await Files.findOne({
            where: { editModeSettingsId, file }
        });

        if (!fileEntry) {
            return res.status(404).json({ error: "File entry not found" });
        }

        await fileEntry.destroy();
        return res.status(200).json({ message: "File entry deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});