import Express from "express";
import StudyGroup from "../models/studyGroup.model.js";
import StudyGroupMember from "../models/studyGroupMember.model.js";

export const studyGroupController = Express.Router();

// GET all study groups
studyGroupController.get("/", async (req, res) => {
    try {
        const studyGroups = await StudyGroup.findAll();
        return res.status(200).json(studyGroups);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET study group by ID
studyGroupController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const studyGroup = await StudyGroup.findByPk(id);

        if (!studyGroup) {
            return res.status(404).json({ error: "Study group not found" });
        }

        return res.status(200).json(studyGroup);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new study group
studyGroupController.post("/", async (req, res) => {
    try {
        const { groupName, description, courseId, createdBy, maxMembers, isPublic } = req.body;

        if (!groupName || !courseId || !createdBy) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const studyGroup = await StudyGroup.create({
            id: `sg_${Date.now()}`,
            groupName,
            description,
            courseId,
            createdBy,
            maxMembers: maxMembers || 50,
            isPublic: isPublic !== undefined ? isPublic : true,
            createdAt: new Date()
        });

        return res.status(201).json(studyGroup);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT update study group
studyGroupController.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { groupName, description, maxMembers, isPublic } = req.body;

        const studyGroup = await StudyGroup.findByPk(id);
        if (!studyGroup) {
            return res.status(404).json({ error: "Study group not found" });
        }

        await studyGroup.update({
            groupName: groupName || studyGroup.groupName,
            description: description || studyGroup.description,
            maxMembers: maxMembers !== undefined ? maxMembers : studyGroup.maxMembers,
            isPublic: isPublic !== undefined ? isPublic : studyGroup.isPublic
        });

        return res.status(200).json(studyGroup);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE study group
studyGroupController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const studyGroup = await StudyGroup.findByPk(id);

        if (!studyGroup) {
            return res.status(404).json({ error: "Study group not found" });
        }

        await studyGroup.destroy();
        return res.status(200).json({ message: "Study group deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST join study group
studyGroupController.post("/:id/join", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const member = await StudyGroupMember.create({
            studyGroupId: id,
            userId,
            joinedAt: new Date(),
            role: 'member'
        });

        return res.status(201).json(member);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});