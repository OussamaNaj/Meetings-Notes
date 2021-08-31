import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

import { spawn } from 'child_process';
import path from 'path/posix';
export const createPost = async (req, res) => {

    const __dirname = path.resolve(path.dirname(''));
    var { title, message, selectedFile, creator, tags } = req.body;
    const processsp = await spawn('python3',[__dirname +'/controllers/traduction1.py',message] )
    processsp.stdout.on('data', async (data1) => {
        var da=JSON.parse(data1)
        const processsp = await spawn('curl',['-d','text='+da.text,"http://bark.phon.ioc.ee/punctuator"] )
        processsp.stdout.on('data', async(data2) => {
            const processsp = await spawn('python3',[__dirname +'/controllers/traduction2.py',data2,da.srclang] )
            processsp.stdout.on('data', async(data3) => {
                message= "Original text : \n"+ message + "\n"+ "Clean text : \n" + data3
                message = message.replaceAll(".",".\n")
                const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })
                try {
                     newPostMessage.save();
                    res.status(201).json(newPostMessage );
                } catch (error) {
                    res.status(409).json({ message: error.message });
                } 
            })
    });
})
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}



export default router;