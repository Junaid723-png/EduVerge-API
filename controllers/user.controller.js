import Express from "express";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { environment } from "../environment.js";

export const userController = Express.Router();

// GET all users
userController.get("/", async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET user by ID
userController.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// POST create new user
userController.post("/", async (req, res) => {
    try {
        const { username, email, password, userType, profilePicture } = req.body;
        const passwordHash = await bcrypt.hash(password,10);

        if (!username || !email || !passwordHash || !userType) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const user = await User.create({
            id: `user_${Date.now()}`,
            username,
            email,
            passwordHash,
            userType,
            profilePicture,
            createdAt: new Date()
        });

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT update user
userController.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, profilePicture, lastLogin } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.update({
            username: username || user.username,
            email: email || user.email,
            profilePicture: profilePicture || user.profilePicture,
            lastLogin: lastLogin ? new Date(lastLogin) : user.lastLogin
        });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE user
userController.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.destroy();
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// login existing user(s)
userController.post("/login", async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({
            where:{
                email: email
            }
        })
        if (!user){
            return res.json({
                error: 'Invalid credentials'
            })
        }
        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPassword) return res.json({ error: 'Invalid credentials'});
        
        const token = await jwt.sign({
            id: user.id,
            username: user.username,
            userType: user.userType,
            profilePicture: user.profilePicture,
            passwordHash: user.passwordHash,
            email: user.email
        },environment.JWTSecretkey,{
            'expiresIn':'12h'
        })
        user.update({ lastLogin: new Date.now() })
        res.status(200).json({message: 'Login Successful', token})
    }catch(err){
        console.log(err);
    }
});