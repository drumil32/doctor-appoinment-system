const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// login call back
const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            console.log(password);
            const isMatch = await bcrypt.compare(password, user.password);
            if (false === isMatch) {
                return res.status(200).send({
                    message: 'invalid credationals',
                    success: false
                });
            } else {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                return res.status(200).send({
                    message: 'Login successfully',
                    token,
                    success: true,
                });
            }
        } else {
            res.status(200).send({
                message: 'invalid credationals',
                success: false
            });
        }
    } catch (error) {
        res.status(500).send({
            message: `Login Controller : ${error.message}`,
            success: false,
        });
    }
}

// register call back
const registerController = async (req, res) => {
    try {
        const user = req.body;
        const checkUser = await userModel.findOne({ email: user.email });
        if (checkUser) {
            return res.status(200).send({
                message: 'User Already Exists',
                success: false
            });
        }
        user.password = await bcrypt.hash(user.password, 10);
        const newUser = new userModel(user);
        await newUser.save();
        res.status(200).send({
            message: 'register successfully',
            success: true
        })
    } catch (error) {
        res.status(500).send({
            message: `Register Controller : ${error.message}`,
            success: false,
        });
    }
}

const getUserData = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        if (!user) {
            res.status(200).send({
                message: 'user not found',
                success: false
            });
        } else {
            res.status(200).send({
                data: {
                    name: user.name,
                    email: user.email
                },
                success: true
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'some thing went wrong',
            success: false
        })
    }
}
module.exports = { loginController, registerController, getUserData }