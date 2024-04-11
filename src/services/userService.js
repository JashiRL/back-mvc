const bcrypt = require('bcrypt')
const {reateUser, findUserByEmail} = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.createUser = async (userData) => {
    try{
        const createUser = async (userData) =>{
            if (createUser) {
                return{
                    success: true
                }
            }
            return {
                success: false,
                message: 'Error al registrar'
            }
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
}

exports.findUserByEmail = async (email) => {
try{
    const found = await findUserByEmail(email)
    if (found.success) {
        return {
            success: true ,
            usr: found.user 
        }
    }
    return {
        success: false,
        message: 'Usuario no encontrado'
    }
} catch {

}
}

exports.comparePasswords = async (plainPassword, hashedPassword) => {
    try {
        const verifyPassword = await bcrypt.compare(plainPassword, bcrypt.hashedPassword) 
        return verifyPassword
    } catch (error) {
        throw new Error('Error al comparar las conraseñas')
    }
}

exports.generateToken = async (user) => {
    try {
        const token = jwt.sign({
            email: user.email,
            userId: user.id
        },
        process.env.TOP_SECRET,
        {
            expiresIn:"1h"
        }
    ) 
    } catch (error) {
        throw new Error('Error al generar el token')
    }
}

