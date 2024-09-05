import User from "../model/userModel.js";


// Helper function to format date to yyyy-mm-dd
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
};


export const create = async (req, res) => {
    try {
        // Format the dob field to yyyy-mm-dd
        if (req.body.dob) {
           req.body.dob = formatDate(req.body.dob);
        }


        // Check if the user with the same email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ msg: "User with this email already exists" });
        }

        const userData = new User(req.body);
        const savedData = await userData.save();
        res.status(201).json(savedData);

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

export const getAll = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData || userData.length === 0) {
            return res.status(404).json({ msg: "User data not found" });
        }
        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Format the dob field to yyyy-mm-dd if present
        if (req.body.dob) {
            req.body.dob = formatDate(req.body.dob);
        }

        // Check if the updated email already exists
        if (req.body.email) {
            const emailExist = await User.findOne({ email: req.body.email, _id: { $ne: id } });
            if (emailExist) {
                return res.status(409).json({ msg: "Email already in use" });
            }
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.status(200).json(updatedData);

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "User not exist" });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ msg: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
