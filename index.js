const express = require('express');
const cookieparser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const hpp = require('hpp');
const cors = require('cors');
const patientRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');
const loginRouter = require('./routes/login')

const app = express()
require('dotenv').config();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser({
    secure: false, // TODO: turn to true before hosting so as to make it accept request from https only
    httpOnly: true
}));
app.use(morgan('combined'));
app.use(hpp());
// app.options('/login', cors());
app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/doctors', doctorsRouter);
app.use('/api/v1', loginRouter);


const PORT = process.env.PORT || 5000;



// error handler
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({
        success: false,
        msg: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});