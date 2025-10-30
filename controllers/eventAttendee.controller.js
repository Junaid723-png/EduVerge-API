import Express from "express";
import EventAttendee from "../models/eventAttendee.model.js";

export const eventAttendeeController = Express.Router();

// GET all event attendees
eventAttendeeController.get("/", async (req, res) => {
    try {
        const eventAttendees = await EventAttendee.findAll();
        return res.status(200).json(eventAttendees);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST register attendee for event
eventAttendeeController.post("/", async (req, res) => {
    try {
        const { eventId, userId, attendanceStatus } = req.body;

        if (!eventId || !userId) {
            return res.status(400).json({ error: "Event ID and user ID are required" });
        }

        const eventAttendee = await EventAttendee.create({
            eventId,
            userId,
            attendanceStatus: attendanceStatus || 'registered',
            registeredAt: new Date()
        });

        return res.status(201).json(eventAttendee);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT update attendance status
eventAttendeeController.put("/", async (req, res) => {
    try {
        const { eventId, userId, attendanceStatus } = req.body;

        if (!eventId || !userId || !attendanceStatus) {
            return res.status(400).json({ error: "Event ID, user ID, and attendance status are required" });
        }

        const eventAttendee = await EventAttendee.findOne({
            where: { eventId, userId }
        });

        if (!eventAttendee) {
            return res.status(404).json({ error: "Event attendee not found" });
        }

        await eventAttendee.update({ attendanceStatus });
        return res.status(200).json(eventAttendee);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE unregister attendee from event
eventAttendeeController.delete("/", async (req, res) => {
    try {
        const { eventId, userId } = req.body;

        if (!eventId || !userId) {
            return res.status(400).json({ error: "Event ID and user ID are required" });
        }

        const eventAttendee = await EventAttendee.findOne({
            where: { eventId, userId }
        });

        if (!eventAttendee) {
            return res.status(404).json({ error: "Event attendee not found" });
        }

        await eventAttendee.destroy();
        return res.status(200).json({ message: "Attendee unregistered from event successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

