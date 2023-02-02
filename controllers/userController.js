const User = require('../models/userModel')

exports.getAllUser = async (req, res) => {

    try {
        const user = await User.find();

        res.status(200).json({
            success: true,
            data: user,
            message: "All user get Successfully"
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }

}

exports.addUser = async (req, res) => {

    const { userName, email, password, age } = req.body

    const newuser = {
        userName,
        email,
        password,
        age
    }

    const finaluser = await User.create(newuser);

    res.status(200).json({
        success: true,
        data: finaluser,
        message: "add user not successfully"
    })
}

exports.updateUser = async (req, res) => {
    const { id } = req.params

    const findUser = await User.findById(id);

    findUser.userName = req.body.userName
    findUser.email = req.body.email
    findUser.password = req.body.password
    findUser.age = req.body.age

    const upadteuser = await findUser.save()

    res.status(200).json({
        success: true,
        data: upadteuser,
        message: "add user not successfully"
    })
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params

    const findUser = await User.findById(id);

    const removeUser = await User.remove(findUser)

    res.status(200).json({
        success: true,
        data: removeUser,
        message: "add user not successfully"
    })
}

