import profileModel from '../models/profileModel.js';
import User from '../models/userModel.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createPortfolio = async (req, res) => {
       try {
            const user = await User.findById(req.user._id);
    
            let imageUrl = null;
    
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    resource_type: "image"
                });
                imageUrl = result.secure_url;
                console.log('Upload successful. Cloudinary response:', result);
            }

            
    
            
        const portfolio = new Portfolio({
            ...req.body,
            Name: user.Name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profilePic: imageUrl,
            Bio,
            Stack,
        });

        await portfolio.save();
        res.status(201).send(portfolio);
    } catch (error) {
        console.error('Error creating Portfolio:', error);
        res.status(400).send({ error: error.message });
    }
};


