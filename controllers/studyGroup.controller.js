import Express from "express";
import StudyGroup from "../models/studyGroup.model.js";
import Course from "../models/course.model.js";
import StudyGroupMember from "../models/studyGroupMember.model.js";
import { Op } from 'sequelize';
import UserProgress from "../models/userProgress.model.js";
import SystemGoal from "../models/systemGoal.model.js";

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

studyGroupController.get('/search-by-query/:query', async (req, res) => {
    try {
        const { query } = req.params;
        
        if (!query || query.trim() === '') {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        const searchQuery = `%${query.trim()}%`;
        
        const studyGroups = await StudyGroup.findAll({
            where: {
                [Op.or]: [
                    { groupName: { [Op.like]: searchQuery } },
                    { description: { [Op.like]: searchQuery } },
                    { courseId: { [Op.like]: searchQuery } },
                    { tags: { [Op.like]: searchQuery } }
                ]
            },
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: 'Search completed successfully',
            results: studyGroups,
            count: studyGroups.length
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

studyGroupController.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const members = await StudyGroupMember.findAll({
            where: { userId }
        });

        const userStudyGroups = [];
        
        for (const member of members) {
            const studyGroup = await StudyGroup.findByPk(member.studyGroupId);
            if (studyGroup) {
                userStudyGroups.push(studyGroup.dataValues);
            }
        }
        return res.status(200).json(userStudyGroups);

    } catch (error) {
        console.error(error);
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
studyGroupController.post("/create", async (req, res) => {
    try {
        const { groupName, description, difficulty, createdBy, maxMembers, isPublic, courseId } = req.body;
        if (!groupName || !description || !createdBy || !courseId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // If courseId is provided, verify that the course exists
        if (courseId) {
            const course = await Course.findByPk(courseId);
            if (!course) {
                return res.status(400).json({ 
                    error: "Invalid courseId - Course not found"
                });
            }
        }

        const studyGroup = await StudyGroup.create({
            id: `sg_${Date.now()}`,
            groupName,
            description,
            difficulty,
            createdBy,
            courseId,            
            tags: "",
            maxMembers: maxMembers || 50,
            isPublic: isPublic !== undefined ? isPublic : true,
            createdAt: new Date()
        });

        await StudyGroupMember.create({
            studyGroupId: studyGroup["dataValues"].id,
            userId: createdBy,
            joinedAt: new Date(),
            role: 'moderator'
        })
        // const systemGoal = await SystemGoal.findAll({
        //     where: {
        //         [Op.or]: [
        //             { title: { [Op.like]: 'Create Your First Study Group' } }
        //         ]
        //     }
        // })

        // await UserProgress.create({
        //     id: ``,
        //     userId: createdBy,
        //     goalId: systemGoal[0].dataValues,
        //     goalType: `system`,
        //     currentValue: 100,
        //     updatedAt: new Date()
        // })

        return res.status(201).json({ studyGroup });
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
studyGroupController.post("/join/:id/:userId", async (req, res) => {
    try {
        const { id, userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const member = await StudyGroupMember.create({
            studyGroupId: id,
            userId,
            joinedAt: new Date(),
            role: 'member'
        });

        return res.status(200).json(member);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
});