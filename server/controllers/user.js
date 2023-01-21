import mongoose from "mongoose"
import UserModal from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const signup = async (res, req) => {
    try {
        const {firstName, lastName, email, password} = res.body
        const existingUser = await UserModal.findOne({email})
        if (existingUser) return req.status(400).json({message: 'The email has been used!'})

        const hashedPassword = await bcrypt.hash(password, 12) 
        const newUser = await UserModal.create({name: `${firstName} ${lastName}`, email, password:hashedPassword})

        const token = jwt.sign({email, id: newUser._id}, 'test', {expiresIn: '1h'})

        req.status(200).json({result: newUser, token})

    } catch (error) {
        req.status(500).json({message: "Something went wrong"})
    }
}

export const signin = async (req, res) => {
    try {
        const {email, password} = req.body
        const existingUser = await UserModal.findOne({email})
        if (!existingUser) return res.status(404).json({message: "User doesn't exist!"})
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"})

        const token = jwt.sign({email, id: existingUser._id}, 'test', {expiresIn: '1h'})

        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}