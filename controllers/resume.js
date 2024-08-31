import User from "../models/User.js";

const getResume = async (req, res, next) => {
    try {
        const { id } = req.query;
        const user = await User.findById(id);
        if (!user || !user.resume) {
            return res.status(404).json({ msg: 'No resume found for this user' });
        }
        res.set('Content-Type', 'application/pdf');
        res.send(user.resume);
    } catch (error) {
        next(error);
    }
}

const postResume = async (req, res, next) => {
    try {
        const { id } = req.query
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ msg: 'No user found' })
        }
        const file = req.file;
        if (!file) {
            return res.status(400).json({ msg: 'No file uploaded' })
        }
        user.resume = file.buffer;
        await user.save()
        res.status(200).json({ msg: 'Success' })
    } catch (error) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            res.status(400).json({ msg: 'File size exceeds the 2MB limit' });
        } else {
            next(error);
        }
    }
}

export { getResume, postResume }