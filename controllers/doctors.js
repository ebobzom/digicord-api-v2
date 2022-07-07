const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const { validationResult } = require('express-validator');

exports.doctorsRegister = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({
        status: false,
        body: errors.array()
      })
    }
  
    const {
      firstName, lastName, email, phoneNumber, specialization, IDNumber, sex, location, password, confirmPassword
    } = req.body;
  
    if(password !== confirmPassword){
      return res.status(400).json({
        status: false,
        body: 'passwords do not match'
      })
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      // store in database
      const newUser = await prisma.doctor.create({
        data: {
            firstName, lastName, email, phoneNumber, specialization, IDNumber, sex, location, password: hashedPassword
        }
      });

      // remove password
      delete newUser.password;

      // generate token
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);

      // add token to result
      newUser.token = token;

      return res.status(201).json({
        status: true,
        body: newUser
      });
  
    } catch (error) {
      
      if(error.code == 'P2002'){
        return res.status(400).json({
          status: false,
          body: 'user already exists, please login'
        })
      }
  
      return res.status(400).json({
        status: false,
        body: error.message
      })
    }
  }
  
  exports.signin = async (req, res) =>{
      const { email, password, rememberMe } = req.body;
      const user = await prisma.user.findUnique({
          where: {
              email
          }
      });
  
      if(user && bcrypt.compareSync(password, user.password)){
          
          const token = jwt.sign({
              id: user.id,
              email: user.email,
              time: Date.now()
          }, process.env.JWT_SECRET,{
              expiresIn: rememberMe ? '24h' : '8h'
          });
      
          res.setHeader(
              'Set-Cookie',
              cookie.serialize(process.env.IDC_COOKIE_NAME, token, {
                  httpOnly: true,
                  maxAge: rememberMe ? 24 * 60 * 60 : 8 * 60 * 60,
                  path: '/',
                  sameSite: 'lax',
                  secure: process.env.NODE_ENV == 'production',
              })
          );
          delete user.password;
          return res.json(user);
          
      }else{
          res.status(401);
          return res.json({
              error: 'Email or Password is Invalid'
          });
  
      }
  
  }