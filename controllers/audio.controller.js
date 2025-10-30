import Express from "express";
import Audio from "../models/audio.model.js";

export const audioController = Express.Router();

// GET all audio files
audioController.get("/", async (req, res) => {
    try {
        const audioFiles = await Audio.findAll();
        return res.status(200).json(audioFiles);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET audio by ID
audioController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const audio = await Audio.findByPk(id);

        if (!audio) {
            return res.status(404).json({ error: "Audio file not found" });
        }

        return res.status(200).json(audio);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new audio
audioController.post("/", async (req, res) => {
    try {
        const { editModeSettingsId, time, audioLink, audioStartTime, audioEndTime } = req.body;

        if (!editModeSettingsId || !audioLink) {
            return res.status(400).json({ error: "Edit mode settings ID and audio link are required" });
        }

        const audio = await Audio.create({
            id: `audio_${Date.now()}`,
            editModeSettingsId,
            time,
            audioLink,
            audioStartTime,
            audioEndTime
        });

        return res.status(201).json(audio);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT update audio
audioController.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { time, audioLink, audioStartTime, audioEndTime } = req.body;

        const audio = await Audio.findByPk(id);
        if (!audio) {
            return res.status(404).json({ error: "Audio file not found" });
        }

        await audio.update({
            time: time || audio.time,
            audioLink: audioLink || audio.audioLink,
            audioStartTime: audioStartTime || audio.audioStartTime,
            audioEndTime: audioEndTime || audio.audioEndTime
        });

        return res.status(200).json(audio);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE audio
audioController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const audio = await Audio.findByPk(id);

        if (!audio) {
            return res.status(404).json({ error: "Audio file not found" });
        }

        await audio.destroy();
        return res.status(200).json({ message: "Audio file deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});