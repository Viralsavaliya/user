const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

exports.register = async (req, res) => {
    try {
        const { userName, email, password, age } = req.body



        const hashpw = await bcrypt.hash(password, 10)
        const newuser = {
            userName,
            email,
            password: hashpw,
            age
        }

        const finaluser = await User.create(newuser);

        res.status(200).json({
            success: true,
            data: finaluser,
            message: "User register successfully"
        })
    } catch (error) {

        res.status(200).json({
            success: false,
            message: "User not register successfully"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const finduser = await User.findOne({ email });

        if (!finduser) {
            const error = new error('Invalid email Or password');
            error.statuscode = 404;
            throw error
        }

        const validpw = await bcrypt.compare(password, finduser.password)

        if (!validpw) {
            const error = new error('Invalid email Or password');
            error.statuscode = 404;
            throw error
        }
        const payload = {
            id: finduser.id,
            email: finduser.email
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '24h'
        })

        finduser.login_token = token

        await finduser.save()



        res.status(200).json({
            success: true,
            data: token,
            message: "User login successfully"
        })


    } catch (error) {
        res.status(200).json({
            success: false,
            message: "User not login "
        })
    }
}


// exports.forgetpassword = async (req, res) => {

//     const {newpassword,confirmpassword} = req.body
// }

const Emailuser = process.env.EMAIL_USER
const Emailpassword = process.env.EMAIL_PASSWORD

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    Port: 465,
    secure: false,
    auth: {
        user: Emailuser,
        pass: Emailpassword
    }
})

exports.sendEmail = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email });

    if (!user) {
        res.status(200).json({
            success: false,
            message: "user not found"
        })
    }

    const userid = user.id

    const payload = {
        id: userid
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "5m" })



    let info = await transporter.sendMail({
        from: `"node" <${Emailuser}>`,
        to: email,
        subject: "welcome to message",
        text: "hello  your password forgot",
        html: `<a href="http://localhost:3000/reset-password?token=${token}">Click here reset password  </a>`

    })


    user.token = token;

    await user.save();

    console.log(token)
    return res.status(200).json({
        success: true,
        data: info,
        message: "your mail successfully"
    })


}


exports.resetpassword = async (req, res) => {

    try {



        const { password, token } = req.body


        let decode
        try {
            decode = jwt.verify(token, process.env.SECRET_KEY)
        } catch (error) {
            const err = new Error('Authorization token invalid')
            err.statusCode = 422
            throw err
        }

        const { id } = decode

        const userid = id

        const user = await User.findById(userid)

        if (!user) {
            const err = new Error('user not exists')
            err.statusCode = 422
            throw err
        }

        const usertoken = user.token;

        if (usertoken !== null) {
            const hashpassword = await bcrypt.hash(password, 10)
            user.password = hashpassword;
            user.token = null
            const upadte = await user.save();



            res.status(200).json({
                success: true,
                data: upadte,
                message: "upadte password successfully"
            })
        }
        else {
            res.status(400).json({
                success: false,
                message: "token not found"
            })
        }


    } catch (error) {
        res.status(400).json({
            success: false,
            message: "user not found"
        })
    }

}






// exports.resetpassword = async (req, res) => {
//     const { password, token } = req.body;

//     function parseJwt(token) {
//         return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
//     }

//     const craeatetoken = parseJwt(token)

//     const { id } = craeatetoken


//     const user = await User.findById(id);

//     if (!user) {
//         const err = new Error('user not exists')
//         err.statusCode = 422
//         throw err
//     }

//     const hashpassword = await bcrypt.hash(password, 10)

//     if (user.password === hashpassword) {
//         const err = new Error('not same password running')
//         err.statusCode = 422
//         throw err
//     }
//     user.password = hashpassword;

//     const upadte = await user.save();


//     res.status(200).json({
//         success: true,
//         data: upadte,
//         message: "upadte password successfully"
//     })
// }