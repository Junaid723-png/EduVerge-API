import Express from "express";
import UserProgress from "../models/userProgress.model.js";

export const userProgressController = Express.Router();

// GET all user progress entries
userProgressController.get("/", async (req, res) => {
    try {
        const userProgressEntries = await UserProgress.findAll();
        return res.status(200).json(userProgressEntries);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET user progress by ID
userProgressController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userProgress = await UserProgress.findByPk(id);

        if (!userProgress) {
            return res.status(404).json({ error: "User progress not found" });
        }

        return res.status(200).json(userProgress);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new user progress
userProgressController.post("/", async (req, res) => {
    try {
        const { userId, goalId, goalType, currentValue } = req.body;

        if (!userId || !goalId || !goalType) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const userProgress = await UserProgress.create({
            id: `up_${Date.now()}`,
            userId,
            goalId,
            goalType,
            currentValue: currentValue || 0,
            updatedAt: new Date()
        });

        return res.status(201).json(userProgress);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT update user progress
userProgressController.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { currentValue } = req.body;

        const userProgress = await UserProgress.findByPk(id);
        if (!userProgress) {
            return res.status(404).json({ error: "User progress not found" });
        }

        await userProgress.update({
            currentValue: currentValue !== undefined ? currentValue : userProgress.currentValue,
            updatedAt: new Date()
        });

        return res.status(200).json(userProgress);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE user progress
userProgressController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userProgress = await UserProgress.findByPk(id);

        if (!userProgress) {
            return res.status(404).json({ error: "User progress not found" });
        }

        await userProgress.destroy();
        return res.status(200).json({ message: "User progress deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});