import Express, { urlencoded } from 'express';
import sequelize from './sequelize.js';
import Cors from 'cors';

// Import ALL controllers
import { courseController } from './controllers/course.controller.js';
import { interactiveModeController } from './controllers/interactiveMode.controller.js';
import { textElementController } from './controllers/textElement.controller.js';
import { cursorPositionController } from './controllers/cursorPosition.controller.js';
import { editModeSettingsController } from './controllers/editModeSettings.controller.js';
import { audioController } from './controllers/audio.controller.js';
import { userController } from './controllers/user.controller.js';
import { userNotesController } from './controllers/userNotes.controller.js';
import { noteController } from './controllers/note.controller.js';
import { courseSettingsController } from './controllers/courseSettings.controller.js';
import { filesController } from './controllers/files.controller.js';
import { studyGroupController } from './controllers/studyGroup.controller.js';
import { studyGroupMemberController } from './controllers/studyGroupMember.controller.js';
import { leaderboardController } from './controllers/leaderboard.controller.js';
import { chatController } from './controllers/chat.controller.js';
import { courseReviewController } from './controllers/courseReview.controller.js';
import { eventController } from './controllers/event.controller.js';
import { eventAttendeeController } from './controllers/eventAttendee.controller.js';
import { userGoalController } from './controllers/userGoal.controller.js';
import { systemGoalController } from './controllers/systemGoal.controller.js';
import { userProgressController } from './controllers/userProgress.controller.js';

const app = Express();
app.use(Express.json());
app.use(urlencoded({ extended: true }));
app.use(Cors({ origin: '*' }));

// Routes for ALL controllers
app.use('/api/courses', courseController);
app.use('/api/interactive-modes', interactiveModeController);
app.use('/api/text-elements', textElementController);
app.use('/api/cursor-positions', cursorPositionController);
app.use('/api/edit-mode-settings', editModeSettingsController);
app.use('/api/audio', audioController);
app.use('/api/users', userController);
app.use('/api/user-notes', userNotesController);
app.use('/api/notes', noteController);
app.use('/api/course-settings', courseSettingsController);
app.use('/api/files', filesController);
app.use('/api/study-groups', studyGroupController);
app.use('/api/study-group-members', studyGroupMemberController);
app.use('/api/leaderboard', leaderboardController);
app.use('/api/chat', chatController);
app.use('/api/course-reviews', courseReviewController);
app.use('/api/events', eventController);
app.use('/api/event-attendees', eventAttendeeController);
app.use('/api/user-goals', userGoalController);
app.use('/api/system-goals', systemGoalController);
app.use('/api/user-progress', userProgressController);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'EduVerge API is running' });
});

// 404 handler
// app.use('*', (req, res) => {
//     res.status(404).json({ error: 'Route not found' });
// });

const PORT = 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');

        await sequelize.sync({ alter: true });
        console.log('Database synced successfully');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

startServer();