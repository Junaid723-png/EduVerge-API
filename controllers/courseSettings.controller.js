import Express from "express";
import CourseSettings from "../models/courseSettings.model.js";

export const courseSettingsController = Express.Router();

// GET all course settings
courseSettingsController.get("/", async (req, res) => {
    try {
        const courseSettings = await CourseSettings.findAll();
        return res.status(200).json(courseSettings);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new course setting
courseSettingsController.post("/", async (req, res) => {
    try {
        const { editModeSettingsId, setting } = req.body;

        if (!editModeSettingsId || !setting) {
            return res.status(400).json({ error: "Edit mode settings ID and setting are required" });
        }

        const courseSetting = await CourseSettings.create({
            editModeSettingsId,
            setting
        });

        return res.status(201).json(courseSetting);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE course setting
courseSettingsController.delete("/", async (req, res) => {
    try {
        const { editModeSettingsId, setting } = req.body;

        if (!editModeSettingsId || !setting) {
            return res.status(400).json({ error: "Edit mode settings ID and setting are required" });
        }

        const courseSetting = await CourseSettings.findOne({
            where: { editModeSettingsId, setting }
        });

        if (!courseSetting) {
            return res.status(404).json({ error: "Course setting not found" });
        }

        await courseSetting.destroy();
        return res.status(200).json({ message: "Course setting deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});