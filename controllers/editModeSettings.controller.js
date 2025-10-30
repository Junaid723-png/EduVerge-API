import Express from "express";
import EditModeSettings from "../models/editModeSettings.model.js";

export const editModeSettingsController = Express.Router();

// GET all edit mode settings
editModeSettingsController.get("/", async (req, res) => {
    try {
        const editModeSettings = await EditModeSettings.findAll();
        return res.status(200).json(editModeSettings);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET edit mode settings by ID
editModeSettingsController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const editModeSettings = await EditModeSettings.findByPk(id);

        if (!editModeSettings) {
            return res.status(404).json({ error: "Edit mode settings not found" });
        }

        return res.status(200).json(editModeSettings);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new edit mode settings
editModeSettingsController.post("/", async (req, res) => {
    try {
        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({ error: "Course ID is required" });
        }

        const editModeSettings = await EditModeSettings.create({
            id: `ems_${Date.now()}`,
            courseId
        });

        return res.status(201).json(editModeSettings);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE edit mode settings
editModeSettingsController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const editModeSettings = await EditModeSettings.findByPk(id);

        if (!editModeSettings) {
            return res.status(404).json({ error: "Edit mode settings not found" });
        }

        await editModeSettings.destroy();
        return res.status(200).json({ message: "Edit mode settings deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});