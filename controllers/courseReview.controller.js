import Express from "express";
import CourseReview from "../models/courseReview.model.js";

export const courseReviewController = Express.Router();

// GET all course reviews
courseReviewController.get("/", async (req, res) => {
    try {
        const courseReviews = await CourseReview.findAll();
        return res.status(200).json(courseReviews);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET course review by ID
courseReviewController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const courseReview = await CourseReview.findByPk(id);

        if (!courseReview) {
            return res.status(404).json({ error: "Course review not found" });
        }

        return res.status(200).json(courseReview);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new course review
courseReviewController.post("/", async (req, res) => {
    try {
        const { courseId, userId, rating, reviewText } = req.body;

        if (!courseId || !userId || !rating) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" });
        }

        const courseReview = await CourseReview.create({
            id: `cr_${Date.now()}`,
            courseId,
            userId,
            rating,
            reviewText,
            createdAt: new Date(),
            isVerified: false
        });

        return res.status(201).json(courseReview);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT update course review
courseReviewController.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, reviewText } = req.body;

        const courseReview = await CourseReview.findByPk(id);
        if (!courseReview) {
            return res.status(404).json({ error: "Course review not found" });
        }

        await courseReview.update({
            rating: rating || courseReview.rating,
            reviewText: reviewText || courseReview.reviewText
        });

        return res.status(200).json(courseReview);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE course review
courseReviewController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const courseReview = await CourseReview.findByPk(id);

        if (!courseReview) {
            return res.status(404).json({ error: "Course review not found" });
        }

        await courseReview.destroy();
        return res.status(200).json({ message: "Course review deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});