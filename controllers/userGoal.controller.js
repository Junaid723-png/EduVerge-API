import Express from "express";
import UserGoal from "../models/userGoal.model.js";

export const userGoalController = Express.Router();

// GET all user goals
userGoalController.get("/", async (req, res) => {
    try {
        const userGoals = await UserGoal.findAll();
        return res.status(200).json(userGoals);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET user goal by ID
userGoalController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userGoal = await UserGoal.findByPk(id);

        if (!userGoal) {
            return res.status(404).json({ error: "User goal not found" });
        }

        return res.status(200).json(userGoal);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new user goal
userGoalController.post("/", async (req, res) => {
    try {
        const { userId, title, description, targetDate, goalType } = req.body;

        if (!userId || !title || !targetDate || !goalType) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const userGoal = await UserGoal.create({
            id: `ug_${Date.now()}`,
            userId,
            title,
            description,
            targetDate: new Date(targetDate),
            goalType,
            createdAt: new Date(),
            status: 'active'
        });

        return res.status(201).json(userGoal);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT update user goal
userGoalController.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, targetDate, status } = req.body;

        const userGoal = await UserGoal.findByPk(id);
        if (!userGoal) {
            return res.status(404).json({ error: "User goal not found" });
        }

        await userGoal.update({
            title: title || userGoal.title,
            description: description || userGoal.description,
            targetDate: targetDate ? new Date(targetDate) : userGoal.targetDate,
            status: status || userGoal.status,
            completedAt: status === 'completed' ? new Date() : userGoal.completedAt
        });

        return res.status(200).json(userGoal);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE user goal
userGoalController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userGoal = await UserGoal.findByPk(id);

        if (!userGoal) {
            return res.status(404).json({ error: "User goal not found" });
        }

        await userGoal.destroy();
        return res.status(200).json({ message: "User goal deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});