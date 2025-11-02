import Express from "express";
import Course from "../models/course.model.js";
import EditModeSettings from "../models/editModeSettings.model.js";
import TextElement from "../models/textElement.model.js";
import InteractiveMode from "../models/InteractiveMode.model.js";
import Audio from "../models/audio.model.js";
import CourseSettings from "../models/courseSettings.model.js";

export const courseController = Express.Router();

// GET course by ID
courseController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        const interactiveModeElements = await InteractiveMode.findAll({
            where: { courseId: id }
        });
        const editModeSettings = await EditModeSettings.findAll({
            where: { courseId: id }
        });
        
        let main = [];
        let audio = [];

        await interactiveModeElements.map(async el => {
            await TextElement.findAll({
                where: { interactiveModeId: el["dataValues"].id },
                attributes: ['time', 'context', 'run']
            }).then(async text => {
                main.push({
                    id: el["dataValues"].id,
                    text: text.map(t => t["dataValues"]),
                    curse: { time: "", x: 0, y: 0 },
                    fileType: el["dataValues"].fileType,
                    fileName: el["dataValues"].fileName
                });
                await editModeSettings.map(async ems => {
                    await Audio.findAll({
                        where: { editModeSettingsId: ems["dataValues"].id },
                    }).then(async audiodb => {
                        await audiodb.map(a => audio.push(a["dataValues"]));
                        const obj = {
                            courseDetails : course["dataValues"],
                            files:[],
                            main,
                            audio
                        };
                        return res.status(200).json(obj);
                    });
                });
            }); 
        });
    } catch (error) {
        console.error("Error fetching course:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Additional routes would go here...
courseController.get("/", async (req, res) => {
    try {
        const Courses = await Course.findAll();
        return res.status(200).json(Courses);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

courseController.post("/create", async (req, res) => {
    const { courseName, courseDescription, prerequisites, price, accessPeriod, courseCollection } = req.body;
    
    if (!courseName || !courseDescription || !prerequisites || !courseCollection) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    let {main, audio, courseSettings, files } = [];

    await Course.create({
        id: `course_${Date.now()}`,
        courseName, 
        courseDescription, 
        prerequisites, 
        price, 
        accessPeriod, 
        courseCollection
    }).then(async (c)=>{
        await EditModeSettings.create({
            id: `ems__${Date.now()}`,
            courseId: c["dataValues"].id
        }).then(async (ems)=>{
            await CourseSettings.create({
                id: `cs__${Date.now()}`,
                editModeSettingsId: ems["dataValues"].id,
                setting: ""
            }).then((cs)=>{
                courseSettings = cs;
            }).catch((err)=>{
                console.log(err);
            });
            await Audio.create({
                id: `a_${Date.now()}`,
                editModeSettingsId: ems["dataValues"].id,
                time: "",
                audioLink: "",
                audioStartTime: "",
                audioEndTime: ""
            }).then((a)=>{
                audio = a;
            }).catch((err)=>{
                console.log(err);
            });
        }).catch((err)=>{
            console.log(err);
        })
        await InteractiveMode.create({
            id: `im_${Date.now()}`,
            courseId: c["dataValues"].id,
            fileType: 'html',
            fileName: 'index'
        }).then(async (im)=>{
            files = im;
            await TextElement.create({
                id: `te_${Date.now()}`,
                interactiveModeId: im["dataValues"].id,
                time: "",
                context: "",
                run: false
            }).then(async (te)=>{
                main = te;
            }).catch((err)=>{
                console.log(err);
            });
        }).catch((err)=>{
            console.log(err);
        });
    }).catch((err)=>{
        console.log(err);
    });

    return res.status(200).json({
        message: "Course Created Successfully",
        main,
        audio,
        courseSettings,
        files
    })
});

courseController.put("/:id", async (req, res) => {
    // Update course
});

courseController.delete("/:id", async (req, res) => {
    // Delete course
});