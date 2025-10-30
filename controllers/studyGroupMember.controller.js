import Express from "express";
import StudyGroupMember from "../models/studyGroupMember.model.js";

export const studyGroupMemberController = Express.Router();

// GET all study group members
studyGroupMemberController.get("/", async (req, res) => {
    try {
        const studyGroupMembers = await StudyGroupMember.findAll();
        return res.status(200).json(studyGroupMembers);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST add member to study group
studyGroupMemberController.post("/", async (req, res) => {
    try {
        const { studyGroupId, userId, role } = req.body;

        if (!studyGroupId || !userId) {
            return res.status(400).json({ error: "Study group ID and user ID are required" });
        }

        const member = await StudyGroupMember.create({
            studyGroupId,
            userId,
            role: role || 'member',
            joinedAt: new Date()
        });

        return res.status(201).json(member);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT update member role
studyGroupMemberController.put("/", async (req, res) => {
    try {
        const { studyGroupId, userId, role } = req.body;

        if (!studyGroupId || !userId || !role) {
            return res.status(400).json({ error: "Study group ID, user ID, and role are required" });
        }

        const member = await StudyGroupMember.findOne({
            where: { studyGroupId, userId }
        });

        if (!member) {
            return res.status(404).json({ error: "Study group member not found" });
        }

        await member.update({ role });
        return res.status(200).json(member);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE remove member from study group
studyGroupMemberController.delete("/", async (req, res) => {
    try {
        const { studyGroupId, userId } = req.body;

        if (!studyGroupId || !userId) {
            return res.status(400).json({ error: "Study group ID and user ID are required" });
        }

        const member = await StudyGroupMember.findOne({
            where: { studyGroupId, userId }
        });

        if (!member) {
            return res.status(404).json({ error: "Study group member not found" });
        }

        await member.destroy();
        return res.status(200).json({ message: "Member removed from study group successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});