
// Text-based AI Chat Message Controller

import axios from "axios";
import { generateText } from "../config/openai.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import { uploadImage } from "../config/imagekit.js";

export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        const {chatId, prompt} = req.body;

        // Check credits
        if (req.user.credits < 1){
            return res.json({success: false, message: 'Not enough credits to generate text'});
        }

        const chat = await Chat.findOne({userId, _id: chatId});

        chat.messages.push({
            role: 'user',
            content: prompt,
            isImage: false,
            timestamp: Date.now(),
        });

        // Generate AI response
        const response = await generateText(prompt);
        const reply = {
            role: 'assistant',
            content: response,
            isImage: false,
            timestamp: Date.now(),
        }

        res.json({success: true, message: 'Message processed successfully', reply});

        chat.messages.push(reply);

        await chat.save();

        await User.updateOne({_id: userId}, {$inc: {credits: -1}})

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Image-based AI Chat Message Controller

export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        const {chatId, prompt, isPublished} = req.body;

        // Check credits
        if (req.user.credits < 2){
            return res.json({success: false, message: 'Not enough credits to generate image'});
        }

        // Find chat
        const chat = await Chat.findOne({userId, _id: chatId});

        // Add user message to chat
        chat.messages.push({
            role: 'user',
            content: prompt,
            isImage: false,
            timestamp: Date.now(),
        });

        // Generate image
        const encodedPrompt = encodeURIComponent(prompt);
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/${Date.now()}.png?tr=w-800,h-800`;

        // Fetch the generated image to ensure it's created
        const aiImgResponse = await axios.get(generatedImageUrl, {responseType: 'arraybuffer'});

        const uploadResult = await uploadImage(aiImgResponse, `${Date.now()}.png`);

        // Add assistant message with image to chat
        const reply = {
            role: 'assistant',
            content: uploadResult.url,
            isImage: true,
            timestamp: Date.now(),
            isPublished
        }

        res.json({success: true, message: 'Image generated successfully', reply});

        chat.messages.push(reply);

        // Save chat
        await chat.save();

        // Deduct credits
        await User.updateOne({_id: userId}, {$inc: {credits: -2}})

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}