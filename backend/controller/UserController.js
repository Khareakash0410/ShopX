const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


const RegisterUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
       let user = await User.findOne({email});
       if (user) return res.status(400).json({message: "User already exists."})

       user = new User({name, email, password});
       await user.save();

       //    remove password for sending
       const { password: _, ...userWithoutPassword } = user.toObject();


      //    create JWT payload
       const payload ={ user: { id: user._id, role: user.role } }

      // Sign and return token along with user details
        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            {expiresIn: "24h"}, 
            (err, token) => {
                if (err) throw err;

                // send token in response

                res.status(201).json({message: "User Registered Sucessfully", userWithoutPassword, token})
            });  
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};

const LoginUser = async (req,res) => {
   const {email, password} = req.body;

   try {
    // find a user by email
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({message: "User not found"});

    const isMatch = await user.matchPassword(password);

    if (!isMatch) return res.status(400).json({message: "Password Incorrect"});

    //    remove password for sending
    const { password: _, ...userWithoutPassword } = user.toObject();

     //    create JWT payload
     const payload ={ user: { id: user._id, role: user.role } }

     // Sign and return token along with user details
    jwt.sign(
    payload, 
    process.env.JWT_SECRET, 
    {expiresIn: "24h"}, 
    (err, token) => {
        if (err) throw err;

        // send token in response

        res.status(201).json({message: "User Login Sucessfully", userWithoutPassword, token})
    }); 

   } catch (error) {
    res.status(500).json({message: "Server Error", error: error.message})
   }
};

const UpdateUser = async (req, res) => {
//    update name password profilePic
  const {name, profilePic, password, confirmPassword} = req.body;

  try {
    const findUser = await User.findById(req.user);

    if (!findUser) return res.status(400).json({message: "User not found!"});

    if (name) {
        findUser.name = name
    }

    if (profilePic) {
        findUser.profilePic = profilePic
    }

    if (confirmPassword) {
        const isMatch = await findUser.matchPassword(password);

        if (!isMatch) return res.status(400).json({message: "Incorrect Old Password"});

        findUser.password = confirmPassword;
    }

    await findUser.save({validateModifiedOnly: true});

    //    remove password for sending
    const { password: _, ...userWithoutPassword } = findUser.toObject();

    res.status(200).json({message: "User Details Updated Successfully!", userWithoutPassword});

  } catch (error) {
    res.status(500).json({message: "Server Error", error: error.message});
  }
};

const DeleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user);
        res.status(200).json({message: "User Deleted Successfully!"})
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};

const PasswordVerify = async (req, res) => {
  const {password} = req.body;
  try {
   const findUser = await User.findById(req.user);

   const ispasswordMatch = await findUser.matchPassword(password);

   if(!ispasswordMatch) return res.status(400).json({message: "Password Incorrect", success: false});
   
   res.status(200).json({message: "Password match", success: true});
   
  } catch (error) {
    res.status(500).json({message: "Server Error", error: error.message});
  }
};

const ForgetPassword = async (req, res) => {
   const {email} = req.body;
   const redirect = req.query.redirect;
   

   const user = await User.findOne({email});
    if (!user) return res.status(400).json({message: "User not found"});

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}?redirect=${encodeURIComponent(redirect)}`;

    const message = `Your reset Password URL is : \n\n ${resetPasswordUrl} \n\n If you have not Requeseted this , Kindly ignore it`;

    try {
        await sendEmail({
            email: user.email,
            message,
            subject: "ShopX Password Recovery"
        });

        res.status(200).json({
            message: `Email sent to ${user.email} successfully!`
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save({validateBeforeSave: false})
        res.status(500).json({message: "Server Error", error: error.message});
    }
};

const ResetPassword = async (req, res) => {
    const {resetToken} = req.params;
    const {password, confirmPassword} = req.body;

    if (password !== confirmPassword) return res.status(400).json({message: "Password and Confirm Password not matched!"});

    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

     try {
        const findUser = await User.findOne({
            resetPasswordToken: resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        });
    
        if (!findUser) return res.status(400).json({message: "Token is Expired or Invalid!"});

        findUser.password = password;
        findUser.resetPasswordToken = undefined;
        findUser.resetPasswordExpires = undefined;

        await findUser.save();

        res.status(200).json({message: "Password Reset Successfully!"});
     } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
     }
    
};

const getUser = async (req, res) => {
    try {
        const findUser = await User.findById(req.user).select("-password");
        res.status(200).json(findUser);
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }  
};


module.exports = {
    RegisterUser,
    LoginUser,
    UpdateUser,
    DeleteUser,
    ForgetPassword,
    ResetPassword,
    getUser,
    PasswordVerify,
};