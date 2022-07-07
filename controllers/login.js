const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const { validationResult } = require('express-validator');

exports.login = async (req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({
        status: false,
        body: errors.array()
      })
    }

    const { email, password, isDoctor } = req.body;
    let user;

    if(isDoctor){
        user = await prisma.doctor.findUnique({
            where: {
                email
            }
        });
    }

    if(!isDoctor){
        user = await prisma.patient.findUnique({
            where: {
                email
            }
        });
    }

    if(user && bcrypt.compareSync(password, user.password)){
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            time: Date.now()
        }, process.env.JWT_SECRET,{
            expiresIn: '8h'
        });

        delete user.password;
        user.token = token;
        return res.json({
            success: true,
            body: user
        });
        
    }else{
        res.status(401);
        return res.json({
            error: 'Email or Password is Invalid'
        });

    }

}