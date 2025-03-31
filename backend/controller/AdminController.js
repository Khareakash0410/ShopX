const User = require("../models/User");


const GetAllUser = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

const AddNewUser = async (req, res) => {
    const {name, email, password, role} = req.body;

    try {
        let user = await User.findOne({email});

        if(user) return res.status(400).json({message: "User Already exists!"});

        user = new User({
            name,
            email,
            password,
            role: role || "customer",
        });

        await user.save();

        res.status(200).json({
            message: "User created Successfully!",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

const UpdateExisitngUser = async (req, res) => {
    try {
        const findUser = await User.findById(req.params.id);

        if(findUser) {
            findUser.name = req.body.name || findUser.name;
            findUser.email = req.body.email || findUser.email;
            findUser.role = req.body.role || findUser.role;
            findUser.profilePic = req.body.profilePic || findUser.profilePic;
        }

        await findUser.save();

        res.status(200).json({
            message: "User updated Successfully!",
            findUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

const DeleteExisitngUser = async (req, res)=> {
    try {
        const findUser = await User.findById(req.params.id);
        if (findUser) {
            await findUser.deleteOne();
            res.status(200).json({message: "User deleted Successfully!"});
        } else {
            res.status(400).json({message: "User Already Deleted"});
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


module.exports = {
    GetAllUser,
    AddNewUser,
    UpdateExisitngUser,
    DeleteExisitngUser,
};