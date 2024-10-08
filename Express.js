const express = require('express');
const app = express();
app.use(express.json());  // to parse JSON request body

// Example of a post route for adding education
app.post('/addEducation', (req, res) => {
  const { institution, degree, year } = req.body;
  // Save to database (using Mongoose, for example)
  Education.create({ institution, degree, year }, (err, newEntry) => {
    if (err) return res.status(500).send('Error saving education.');
    res.redirect('/education');
  });
});

const mongoose= require('mongoose');
const educationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  year: String,
});

const Education = mongoose.model('Education', educationSchema);
const nodemailer = require('nodemailer');

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password'
    }
  });

  const mailOptions = {
    from: email,
    to: 'your-email@gmail.com',
    subject: 'New Contact Form Submission',
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send('Message Sent');
  });
});

