import Express from "express";
import Course from "../models/course.model.js"; // Import your model

export const courseController = Express.Router();

// GET course by ID
courseController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        // Actually fetch from database
        const course = await Course.findByPk(id, {
            include: ['interactiveModes', 'reviews'] // Include related data
        });

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        return res.status(200).json(course);
    } catch (error) {
        console.error("Error fetching course:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Additional routes would go here...
courseController.get("/", async (req, res) => {
    // Get all courses
});

courseController.post("/", async (req, res) => {
    // Create new course
});

courseController.put("/:id", async (req, res) => {
    // Update course
});

courseController.delete("/:id", async (req, res) => {
    // Delete course
});