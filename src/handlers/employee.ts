import prisma from '../db'
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
import { comparePasswords, createJWT ,hashPassword } from '../modules/auth'

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const upload = multer({ dest: 'uploads/' }); 


export const createNewEmployee = async (req, res, next) => {
    try {
        const { name, designation } = req.body;
        const imagePath = req.file.path;
        const imageUrl = `http://localhost:3000/${imagePath}`;
        // const image = req.file.buffer;

        const createdEmployee = await prisma.employee.create({
            data: {
                name: name,
                designation: designation,
                image: imageUrl,
            }
        })
        res.json(createdEmployee);
    } catch (e) {
        e.type = 'input'
        next(e)
    }
}

// class CustomError extends Error {
    
// }

