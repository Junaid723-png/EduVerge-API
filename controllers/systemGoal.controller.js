import Express from "express";
import SystemGoal from "../models/systemGoal.model.js";

export const systemGoalController = Express.Router();

// GET all system goals
systemGoalController.get("/", async (req, res) => {
    try {
        const systemGoals = await SystemGoal.findAll();
        return res.status(200).json(systemGoals);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET system goal by ID
systemGoalController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const systemGoal = await SystemGoal.findByPk(id);

        if (!systemGoal) {
            return res.status(404).json({ error: "System goal not found" });
        }

        return res.status(200).json(systemGoal);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new system goal
systemGoalController.post("/", async (req, res) => {
    try {
        const { title, description, goalType, targetValue, createdBy } = req.body;

        if (!title || !goalType || !targetValue || !createdBy) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const systemGoal = await SystemGoal.create({
            id: `sg_${Date.now()}`,
            title,
            description,
            goalType,
            targetValue,
            createdBy,
            createdAt: new Date(),
            isActive: true
        });

        return res.status(201).json(systemGoal);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT update system goal
systemGoalController.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, targetValue, isActive } = req.body;

        const systemGoal = await SystemGoal.findByPk(id);
        if (!systemGoal) {
            return res.status(404).json({ error: "System goal not found" });
        }

        await systemGoal.update({
            title: title || systemGoal.title,
            description: description || systemGoal.description,
            targetValue: targetValue !== undefined ? targetValue : systemGoal.targetValue,
            isActive: isActive !== undefined ? isActive : systemGoal.isActive
        });

        return res.status(200).json(systemGoal);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE system goal
systemGoalController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const systemGoal = await SystemGoal.findByPk(id);

        if (!systemGoal) {
            return res.status(404).json({ error: "System goal not found" });
        }

        await systemGoal.destroy();
        return res.status(200).json({ message: "System goal deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});