import prisma from '../db'
const multer = require('multer');
const path = require('path');
import fs from 'fs';
import { comparePasswords, createJWT ,hashPassword } from '../modules/auth'

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const upload = multer({ dest: 'uploads/' }); 
   

export const createNewEmployee = async (req, res, next) => {
    try {
        const { name, designation } = req.body;
        const imagePath = req.file.path;

        // const uniqueFilename = path.extname(req.file.originalname);
        // const newImagePath = path.join('uploads/', uniqueFilename);

        const finalDestination = path.join('uploads/', req.file.originalname);

        fs.renameSync(imagePath, finalDestination);


        let baseUrl;

        if (process.env.NODE_ENV === 'production') {
            baseUrl = 'https://api-design-v4-jr3v.onrender.com';
        } else {
            baseUrl = 'http://localhost:3000';
        }

        const imageUrl = `${baseUrl}/${finalDestination}`;
        // const image = req.file.buffer;

        const createdEmployee = await prisma.employee.create({
            data: {
                name: name,
                designation: designation,
                image: imageUrl.replace(/\\/g, '/'),
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

