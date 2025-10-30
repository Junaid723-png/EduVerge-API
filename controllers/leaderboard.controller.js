import Express from "express";
import Leaderboard from "../models/leaderboard.model.js";

export const leaderboardController = Express.Router();

// GET all leaderboard entries
leaderboardController.get("/", async (req, res) => {
    try {
        const leaderboardEntries = await Leaderboard.findAll();
        return res.status(200).json(leaderboardEntries);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET leaderboard entry by ID
leaderboardController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const leaderboardEntry = await Leaderboard.findByPk(id);

        if (!leaderboardEntry) {
            return res.status(404).json({ error: "Leaderboard entry not found" });
        }

        return res.status(200).json(leaderboardEntry);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new leaderboard entry
leaderboardController.post("/", async (req, res) => {
    try {
        const { studyGroupId, userId, courseId, score, metricType } = req.body;

        if (!studyGroupId || !userId || !courseId || !metricType) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const leaderboardEntry = await Leaderboard.create({
            id: `lb_${Date.now()}`,
            studyGroupId,
            userId,
            courseId,
            score: score || 0,
            metricType,
            lastUpdated: new Date()
        });

        return res.status(201).json(leaderboardEntry);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT update leaderboard score
leaderboardController.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { score, rank } = req.body;

        const leaderboardEntry = await Leaderboard.findByPk(id);
        if (!leaderboardEntry) {
            return res.status(404).json({ error: "Leaderboard entry not found" });
        }

        await leaderboardEntry.update({
            score: score !== undefined ? score : leaderboardEntry.score,
            rank: rank !== undefined ? rank : leaderboardEntry.rank,
            lastUpdated: new Date()
        });

        return res.status(200).json(leaderboardEntry);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE leaderboard entry
leaderboardController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const leaderboardEntry = await Leaderboard.findByPk(id);

        if (!leaderboardEntry) {
            return res.status(404).json({ error: "Leaderboard entry not found" });
        }

        await leaderboardEntry.destroy();
        return res.status(200).json({ message: "Leaderboard entry deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});