import Express from "express";
import Event from "../models/event.model.js";

export const eventController = Express.Router();

// GET all events
eventController.get("/", async (req, res) => {
    try {
        const events = await Event.findAll();
        return res.status(200).json(events);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET event by ID
eventController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        return res.status(200).json(event);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new event
eventController.post("/", async (req, res) => {
    try {
        const { title, description, eventType, startDateTime, endDateTime, organizerId, maxAttendees, isPublic } = req.body;

        if (!title || !eventType || !startDateTime || !endDateTime || !organizerId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const event = await Event.create({
            id: `event_${Date.now()}`,
            title,
            description,
            eventType,
            startDateTime: new Date(startDateTime),
            endDateTime: new Date(endDateTime),
            organizerId,
            maxAttendees,
            isPublic: isPublic !== undefined ? isPublic : true
        });

        return res.status(201).json(event);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT update event
eventController.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, eventType, startDateTime, endDateTime, maxAttendees, isPublic } = req.body;

        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        await event.update({
            title: title || event.title,
            description: description || event.description,
            eventType: eventType || event.eventType,
            startDateTime: startDateTime ? new Date(startDateTime) : event.startDateTime,
            endDateTime: endDateTime ? new Date(endDateTime) : event.endDateTime,
            maxAttendees: maxAttendees !== undefined ? maxAttendees : event.maxAttendees,
            isPublic: isPublic !== undefined ? isPublic : event.isPublic
        });

        return res.status(200).json(event);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE event
eventController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        await event.destroy();
        return res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});