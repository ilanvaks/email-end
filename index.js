import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from "dotenv"

dotenv.config()

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    let mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Message from ${name}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).send();
    } catch (error) {
        console.log('Error Occurs', error);
        res.status(500).send();
    }
});

app.listen(3001, () => console.log('Server running on port 3001'));
