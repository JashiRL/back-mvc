const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { createUser, findUserByEmail } = require('../services/userService')
const { response } = require('express')

exports.signup = async (req, res) => {
    try {
        //Código para registrarse 
        const { email, password } = req.body
        const existinguser = await findUserByEmail(email)
        if (existinguser.success) {
            return res.status(400).json({
                message: `El usuario ya esta registrado`
            })
        }
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = {
            email: email,
            password: hashedPassword
            //agregar otros campos 
        }

        const userResult = await createUser(newUser)
        if (userResult.success) {
            res.status(201).json({
                message: 'Usuairio registrado satisfactoriamente'
            })
        } else {
            res.status(500).json({
                message: 'Error al registrar al usuario '
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        //Código para loggearnos 
        const { email, password } = req.body
        const findEmail = await findUserByEmail(email)

        if (!findEmail.success) {
            res.status(401).json({
                message: 'Usuairio no encontrado'
            })
        }
        const user = findEmail.user
        const findPassword = await bcrypt.compare(password, user.password)

        if (!findPassword.success) {
            res.status(401).json({
                message: ' Incorrect password '
            })
        }
        const token = jsonwebtoken.sign({
            email: user.email,
            userId: user.id
        }, precess.env.TOPSECRET, {
            expiresIn: '1h'
        })
        res.status(200).json({
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}